
const Chat = require('../app/models/chat.model');
const Student = require('../app/models/student.model');
const Teacher = require('../app/models/teacher.model');
const Call = require('../app/models/call.model');
const Notification = require('../app/models/notifications.model')

module.exports = io => {
    // socket io connection 
    io.on("connection", socket => {
        console.log("New client connected ");

        socket.emit('connect', {
            'dummy': 'lol'
        });

        socket.on('userUpdate', async data => {
            try {

                console.log('user update', data);
                const userId = data.userId;
                const socketId = data.socketId;
                const userRole = data.role;

                if (userRole === 'student') {

                    await Student.updateOne({ _id: userId }, {
                        $set: {
                            socketId: socketId
                        }
                    }, { runValidators: true });


                } else {

                    await Teacher.updateOne({ _id: userId }, {
                        $set: {
                            socketId: socketId
                        }
                    }, { runValidators: true });

                }

            } catch (error) {
                console.log(error);
            }
        });

        //per user
        socket.on('newMessage', async data => {
            try {

                console.log('new MEssage Data: ', data);

                const chat = new Chat(data);

                const message = await chat.save();

                // io.emit('messageSent', foo);

                // reciever userId => get socketId from db (user collection)


                if (data.role === 'student') {

                    console.log(' i am student ');

                    const students = await Student.findOne({
                        _id: data.receiverId
                    })
                        .lean();

                    const socketId = students.socketId;

                    console.log('socket id', socketId);

                    // send to specific user
                    io.to(socketId).emit("messageSent", message);

                } else {

                    console.log(' i am teacher ');

                    const teachers = await Teacher.findOne({
                        _id: data.receiverId
                    })
                        .lean();




                    const socketId = teachers.socketId;
                    console.log('socket ID: ', socketId);
                    // send to specific user
                    io.to(socketId).emit("messageSent", message);

                }


            } catch (error) {
                throw Error(error);
            }
        });


        socket.on('presenceProtocol', async data => {

            try {

                if (data.userRole === 'student') {

                    const onlineUser = await Student.find({ isOnline: true });
                    const socketIds = onlineUser.filter(element => element.socketId);
                    socketIds.forEach(socketId => io.to(socketId).emit("onlineUser"), { userId: data.userId });

                } else {

                    const onlineUser = await Student.find({ isOnline: true });
                    const socketIds = onlineUser.filter(element => element.socketId);
                    socketIds.forEach(socketId => io.to(socketId).emit("onlineUser"), { userId: data.userId });

                }

            } catch (error) {

                console.log(error);

            }

        });



        socket.on('call', async data => {

            try {

                console.log('call data ::: ', data);
                const { studentId, teacherId, role, callUrl } = data;

                if (role === 'tutor') {
                    const studentRecord = await Student.findOne({ _id: studentId }).lean();
                    const { socketId } = studentRecord;

                    // send to specific user
                    io.to(socketId).emit("initiateCall", {
                        callUrl: callUrl,
                        teacherId: teacherId
                    });
                }

                console.log('emitted <<<<<<<<');

            } catch (error) {
                console.log('url ::: ', error);
            }
        });



        socket.on('isCallAccepted', async data => {
            console.log('Is call accepted: ', data);
            if (data.isCallAccepted) {
                const teacherRecord = await Teacher.findOne({ _id: data.teacherId }).lean();
                const { socketId } = teacherRecord;
                // send to specific user
                io.to(socketId).emit("callAccepted", {
                    callAccepted: true
                });
            } else {
                const teacherRecord = await Teacher.findOne({ _id: data.teacherId }).lean();
                const { socketId } = teacherRecord;
                // send to specific user
                io.to(socketId).emit("callRejected", {
                    callAccepted: false
                });
            }
        });

        socket.on('requestAppointment',async data =>{
            if(data){
                try{
                    const newNotification = new Notification(data);
                    await newNotification.save();
                }
                catch(error){
                    console.log(error)
                }
            }
        })

        socket.on('acceptAppointment',async data =>{
            if(data){
                try{
                    const newNotification = new Notification(data);
                    await newNotification.save();
                }
                catch(error){
                    console.log(error)
                }
            }
        })
    });
}