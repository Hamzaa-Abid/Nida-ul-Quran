import React, { useEffect, useState, useCallback, useRef } from "react";

import "./style.css";
import axios from "../../../../axios";
import getUserInfo from "../../../../shared/Helpers/getUserInfo";
import { Tabs, Empty, message, Modal, Spin, TimePicker, Button, Space, DatePicker, Table, notification, Popover, Select } from "antd";
import msgIcon from "../../../../assets/images/messagewhite-icon.png";
import CallIcon from "../../../../assets/images/videocall-icon.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import callerTune from "../../../../assets/audio/calling.mp3";
import { VideoCameraOutlined, LoadingOutlined, WarningOutlined, CheckCircleTwoTone, RightOutlined, LeftOutlined, TransactionOutlined  } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import dayjs from "dayjs";
//import { toast } from "react-toastify";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
const { TabPane } = Tabs;

//const date = new Date()
const token = JSON.parse(localStorage.getItem('token'))
const getColumns = (date) => {
  const columns = [
    {
      title: '',
      dataIndex: 'slot',
      width:'100px',
    },
    {
      title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 0)).getDate()}</span> Mon</span>,
      dataIndex: 'Monday',
      date: new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 0)).getDate(),
      value: '1',    
      render: (item, record) => data.length >= 1 ? (
      item ? item.text=='Pending'?<span className="tag-color-pending">{item.text}</span>: (item.text=='Approved' ? <Popover placement="topLeft" content={<div><p><span>Name:</span> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><span>Country:</span> {item.student ? item.student.country : ''}</p><p><span>Subjects:</span> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
        : '') : null  
    },
    {
      title:  <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 1)).getDate()}</span> Tue</span>,
      dataIndex: 'Tuesday',
      date: new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 1)).getDate(),
      value: '2',
      render: (item, record) => data.length >= 1 ? (
        item ? item.text=='Pending'?<span className="tag-color-pending">{item.text}</span>: (item.text=='Approved' ? <Popover placement="topLeft" content={<div><p><span>Name:</span> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><span>Country:</span> {item.student ? item.student.country : ''}</p><p><span>Subjects:</span> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
          : '') : null         },
    {
      title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 2)).getDate()}</span> Wed</span>,
      dataIndex: 'Wednesday',
      date: new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 2)).getDate(),
      value: '3',
      render: (item, record) => data.length >= 1 ? (
        item ? item.text=='Pending'?<span className="tag-color-pending">{item.text}</span>: (item.text=='Approved' ? <Popover placement="topLeft" content={<div><p><span>Name:</span> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><span>Country:</span> {item.student ? item.student.country : ''}</p><p><span>Subjects:</span> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
          : '') : null          },
    {
      title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 3)).getDate()}</span> Thu</span>,
      dataIndex: 'Thursday',
      date: new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 3)).getDate(),
      value: '4',
      render: (item, record) => data.length >= 1 ? (
        item ? item.text=='Pending'?<span className="tag-color-pending">{item.text}</span>: (item.text=='Approved' ? <Popover placement="topLeft" content={<div><p><span>Name:</span> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><span>Country:</span> {item.student ? item.student.country : ''}</p><p><span>Subjects:</span> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
          : '') : null          },
    {
      title:  <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 4)).getDate()}</span> Fri</span>,
      dataIndex: 'Friday',
      date: new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 4)).getDate(),
      value: '5',
      render: (item, record) => data.length >= 1 ? (
        item ? item.text=='Pending'?<span className="tag-color-pending">{item.text}</span>: (item.text=='Approved' ? <Popover placement="topLeft" content={<div><p><span>Name:</span> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><span>Country:</span> {item.student ? item.student.country : ''}</p><p><span>Subjects:</span> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
          : '') : null         },
    {
      title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 5)).getDate()}</span> Sat</span>,
      dataIndex: 'Saturday',
      value: '6',
      date: new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 5)).getDate(),
      render: (item, record) => data.length >= 1 ? (
        item ? item.text=='Pending'?<span className="tag-color-pending">{item.text}</span>: (item.text=='Approved' ? <Popover placement="topLeft" content={<div><p><span>Name:</span> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><span>Country:</span> {item.student ? item.student.country : ''}</p><p><span>Subjects:</span> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
          : '') : null           },
    {
      title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 6)).getDate()}</span> Sun</span>,
      dataIndex: 'Sunday',
      date: new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 6)).getDate(),
      value: '0',
      render: (item, record) => data.length >= 1 ? (
        item ? item.text=='Pending'?<span className="tag-color-pending">{item.text}</span>: (item.text=='Approved' ? <Popover placement="topLeft" content={<div><p><span>Name:</span> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><span>Country:</span> {item.student ? item.student.country : ''}</p><p><span>Subjects:</span> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
          : '') : null           }
  ];
  return columns
  }

const data = [
  {
    key: '1',
    display: '12:00 am-12:30 am',
    slot: '00:00'
  },
  {
    key: '2',
    display: '12:30 am-01:00 am',
    slot: '00:30'
  },
  {
    key: '3',
    display: '01:00 am-01:30 am',
    slot: '01:00'
  },
  {
    key: '4',
    display: '01:30 am-02:00 am',
    slot: '01:30'
  },
  {
    key: '5',
    display: '02:00 am-02:30 am',
    slot: '02:00'
  },
  {
    key: '6',
    display: '02:30 am-03:00 am',
    slot: '02:30'
  },
  {
    key: '7',
    display: '03:00 am-03:30 am',
    slot: '03:00'
  },
  {
    key: '8',
    display: '03:30 am-04:00 am',
    slot: '03:30'
  },
  {
    key: '9',
    display: '04:00 am-04:30 am',
    slot: '04:00'
  },
  {
    key: '10',
    display: '04:30 am-05:00 am',
    slot: '04:30'
  },
  {
    key: '11',
    display: '05:00 am-05:30 am',
    slot: '05:00'
  },
  {
    key: '12',
    display: '05:30 am-06:00 am',
    slot: '05:30'
  },
  {
    key: '13',
    display: '06:00 am-06:30 am',
    slot: '06:00'
  },
  {
    key: '14',
    display: '06:30 am-07:00 am',
    slot: '06:30'
  },
  {
    key: '15',
    display: '7:00 am-07:30 am',
    slot: '7:00'
  },
  {
    key: '16',
    display: '07:30 am-08:00 am',
    slot: '07:30'
  },
  {
    key: '17',
    display: '08:00 am-08:30 am',
    slot: '08:00'
  },
  {
    key: '18',
    display: '08:30 am-09:00 am',
    slot: '08:30'
  },
  {
    key: '19',
    display: '09:00 am-09:30 am',
    slot: '09:00'
  },
  {
    key: '20',
    display: '09:30 am-10:00 am',
    slot: '09:30'
  },
  {
    key: '21',
    display: '10:00 am-10:30 am',
    slot: '10:00'
  },
  {
    key: '22',
    display: '10:30 am-11:00 am',
    slot: '10:30'
  },
  {
    key: '23',
    display: '11:00 am-11:30 am',
    slot: '11:00'
  },
  {
    key: '24',
    display: '11:30 am-12:00 pm',
    slot: '11:30'
  },
  {
    key: '25',
    display: '12:30 pm-01:00 pm',
    slot: '12:30'
  },
  {
    key: '26',
    display: '01:00 pm-01:30 pm',
    slot: '13:00'
  },
  {
    key: '27',
    display: '01:30 pm-02:00 pm', 
    slot: '13:30' 
  },
  {
    key: '28',
    display: '02:00 pm-02:30 pm',
    slot: '14:00'
  },
  {
    key: '29',
    display: '02:30 pm-03:00 pm',
    slot: '14:30'
  },
  {
    key: '30',
    display: '03:30 pm-04:00 pm',
    slot: '15:30'
  },
  {
    key: '31',
    display: '04:00 pm-04:30 pm',
    slot: '16:00'
  },
  {
    key: '32',
    display: '04:30 pm-05:00 pm',
    slot: '16:30'
  },
  {
    key: '33',
    display: '05:00 pm-05:30 pm',
    slot: '17:00'
  },
  {
    key: '34',
    display: '05:30 pm-06:00 pm',
    slot: '17:30'
  },
  {
    key: '35',
    display: '06:00 pm-06:30 pm',
    slot: '18:00'
  },
  {
    key: '36',
    display: '06:30 pm-07:00 pm',
    slot: '18:30'
  },
  {
    key: '37',
    display: '07:00 pm-07:30 pm',
    slot: '19:00'
  },
  {
    key: '38',
    display: '07:30 pm-08:00 pm',
    slot: '19:30'
  },
  {
    key: '39',
    display: '08:00 pm-08:30 pm',
    slot: '20:00'
  },
  {
    key: '40',
    display: '08:30 pm-09:00 pm',
    slot: '20:30'
  },
  {
    key: '41',
    display: '09:00 pm-09:30 pm',
    slot: '21:00'
  },
  {
    key: '42',
    display: '09:30 pm-10:00 pm',
    slot: '21:30'
  },
  {
    key: '43',
    display: '10:00 pm-10:30 pm',
    slot: '22:00'
  },
  {
    key: '44',
    display: '10:30 pm-11:00 pm',
    slot: '22:30',
  },
  {
    key: '45',
    display: '11:00 pm-11:30 pm',
    slot: '23:00'
  },
  {
    key: '46',
    display: '11:30 pm-12:00 am',
    slot: '23:30'
  }
];
const Landing = () => {
  const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { confirm } = Modal;
  let SocketData = useSelector((state) => state.socketReducer.data);
  const CALL_URL = "https://alkitab-jitsi.centralus.cloudapp.azure.com/";
  const history = useHistory();
  let audio = new Audio(callerTune);
  const photo =
    "https://emeraldpsychiatry.com/wp-content/uploads/2018/05/dummy_players.png";

  const [isAllTutors, setAllTutors] = useState([]);
  const [isAllInvited, setAllInvited] = useState([]);
  const [isUserInfo, setUserInfo] = useState({});
  const [isInvitedId, setInvitedId] = useState(null);
  const [isPendingInvitations, setPendingInvitations] = useState([]);
  const [isAllRecommendations, setAllRecommendations] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState('') 
  const [dataSource, setDataSource] = useState(data)
  const [profileImg, setProfileImg] = useState([]);
  const [rImg, setRImg] = useState([]);
  const [siImg, setSiImg] = useState([]);
  const [riImg, setRiImg] = useState([]);
  const [record, setRecord] = useState({
    start: '',
    end: '',
    day: '',
    key: ''
  })
  const [visible, setVisible] = useState(false);
  const [visible_, setVisible_] = useState(false)
  const [teacherID, setTeacherID] = useState({
    tid: '',
    contactID: '',
    subjects: []
  })
  const [dataBody, setDataBody] = useState([])

  const [weekDate, setWeekDate] = useState(new Date())
  const [loadingSpin, setLoadingSpin] = useState(false)
  //Hammad Start
  const [iDate, setInitialDate] = useState(new Date());
  const [columns, setColumn] = useState(getColumns(new Date()));
  const prevWeek = () => {
    let myDate = new Date(iDate);
    myDate.setDate(myDate.getDate() - 8);
    setInitialDate(myDate);
    let newCol = getColumns(myDate);
    setColumn(newCol);
  };

  const nextWeek = () => {
    let newDate = dayjs(iDate).add(6, "day").toDate();
    console.log('This is newDate', newDate);
    const colDate = newDate;
    setInitialDate(newDate);
    let newCol = getColumns(colDate);
    setColumn(newCol);
  };

  const prevWeekClone = () => {
    let myDate = new Date(weekDate)
    setWeekDate(myDate.setDate(myDate.getDate() - 8))
  }

  const nextWeekClone = () => {
    setWeekDate(dayjs(iDate).add(6, "day").toDate())
  }

  //Hammad end

  useEffect(() => {
    getData()
  }, [weekDate])
  //Hammad end

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Appointments',
      description:
        'Appointments have been created. The email has been sent to the teacher.',
    });
  };

  useEffect(() => {
    if(visible == false) {
      setTeacherID('')
      setDataBody([])
      setDataSource(data)
    }
  }, [visible])
  var tempData = [...data];

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    getData()
  }, [teacherID])

  useEffect(() => {
    if(record.start !== '') {
      console.log('Before going to handle add', record.start)
      handleAdd(record.day, record.key)
    }
  }, [record])

  const getData = async() => {
    if(!teacherID.tid) {
      return
    }
    setLoadingSpin(true)
    await axios.get(`http://localhost:5500/tutor/get-schedule?teacherId=${teacherID.tid}`, {
      headers: {
        'authorization': token
      }
    })
    .then((res) => {
      console.log(res)
      
      res.data.data.forEach(item => {
        const ind = tempData.findIndex((x) => {
          return x.key==item.calID
        })
        const obj = tempData.find((y) => {
          return y.key==item.calID
        })

        let day = ''
        switch (item.weekday) {
          case 0:
            day = 'Sunday'
            break;
          case 1:
            day = 'Monday'
            break;
          case 2:
            day = 'Tuesday'
            break;
          case 3:
            day = 'Wednesday'
            break;
          case 4:
            day = 'Thursday'
            break;
          case 5:
            day = 'Friday'
            break;
          case 6:
            day = 'Saturday'
            break;
          
          default:
            break;
        }
        item.text = 'Available';
        const updatedObj = Object.assign({[day]: item}, obj)
        tempData.splice(ind, 1, updatedObj)
        setDataSource([...tempData])
      })
    })
    .then(() => {
      console.log('This is weekdate', weekDate)
      //const d = weekDate
      //const n = d.toISOString()
      console.log('The promise is resolved')
      axios.get(`http://localhost:5500/get-appointment-by-id?contactID=${teacherID.contactID}&weekDate=${weekDate}`, {
        headers: {
          'authorization': token
        }
      })
      .then((res) => {
        let arr = []
        res.data.data.forEach(curr => arr.push({
          schedule: curr.schedule,
          isBooked: curr.isBooked,
          student: curr.student[0]
        }))
        //let tempData = [...dataSource];
      
        arr.forEach(item => {
          var ind = tempData.findIndex((x) => {
            return x.key==item.schedule.calID
          })
          var obj = tempData.find((y) => {
            return y.key==item.schedule.calID
          })

          let day = ''
          switch (item.schedule.weekday) {
            case 0:
              day = 'Sunday'
              break;
            case 1:
              day = 'Monday'
              break;
            case 2:
              day = 'Tuesday'
              break;
            case 3:
              day = 'Wednesday'
              break;
            case 4:
              day = 'Thursday'
              break;
            case 5:
              day = 'Friday'
              break;
            case 6:
              day = 'Saturday'
              break;
            
            default:
              break;
          }
          
          if (item.isBooked) {
            item.text = 'Scheduled';
            delete obj[day]
            const updatedObj = Object.assign({[day]: item}, obj)
            tempData.splice(ind, 1, updatedObj)
            setDataSource([...tempData])
            } else {
            delete obj[day]
            item.text = 'Pending'
            const updatedObj = Object.assign({[day]: item}, obj)
            tempData.splice(ind, 1, updatedObj)
            setDataSource([...tempData])
          }
        })
      })
      .then(res => {
              const d = weekDate
      const n = d.toISOString()

        axios.get(`http://localhost:5500/get-leaves-by-id?teacherID=${teacherID.tid}&weekDate=${weekDate}`, {
          headers: {
            'authorization': token
          }
        })
        .then(res => {
          let arr = []
          res.data.data.forEach(curr => arr.push({
            schedule: curr.schedule,
            isBooked: curr.isBooked
          }))
          //let tempData = [...dataSource];
        
          arr.forEach(item => {
            var ind = tempData.findIndex((x) => {
              return x.key==item.schedule.calID
            })
            var obj = tempData.find((y) => {
              return y.key==item.schedule.calID
            })
  
            let day = ''
            switch (item.schedule.weekday) {
              case 0:
                day = 'Sunday'
                break;
              case 1:
                day = 'Monday'
                break;
              case 2:
                day = 'Tuesday'
                break;
              case 3:
                day = 'Wednesday'
                break;
              case 4:
                day = 'Thursday'
                break;
              case 5:
                day = 'Friday'
                break;
              case 6:
                day = 'Saturday'
                break;
              
              default:
                break;
            }
            
              delete obj[day]
              //item.text = 'Leave'
              //const updatedObj = Object.assign({[day]: {text: 'Leave'}}, obj)
              tempData.splice(ind, 1)
              setDataSource([...tempData])
         })
        })
        setLoadingSpin(false)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }

  const handleDelete = (day, key, slot) => {
    const ind = data.findIndex((item) => {
      return item.key==key
    })
    const obj = data.find(item => {
      return item.key==key && item.hasOwnProperty(day)
    })

    console.log('This object is to be deleted', obj)
    if(obj) {
      delete obj[day]

      //const updatedObj = Object.assign({[day]: 'Available'}, obj)
      data.splice(ind, 1, obj)
      setDataSource([...data, data])
    }
    console.log('This is deleted object', obj)
  };

  // const setUserName = async () => {
  //   const userInfo = await localStorage.getItem("userInfo");
  //   const name = JSON.parse(userInfo);
  //   console.log("User Info", name);
  //   setUser(name.username);
  // };

  const handleAdd = (day, key) => {
    //let weekday = day.split(' ')[1]
    let weekday = day
    const tempData = [...dataSource]

    const ind = tempData.findIndex((item) => {
        return item.key==key
    })
    const obj = tempData.find((item) => {
        return item.key==key
    })

    if (obj[weekday] == {text: 'Pending'}) {
      let arr = [...dataBody]
      const ind2 = arr.findIndex(item => {
        let start_ = String(item.startDate) 
        let end_ = String(item.endDate)

        let rstart_ = String(record.start)
        let rend_ = String(record.end)

        return item.calID==Number(record.key) && (start_==rstart_ && end_==rend_) 
      })

      console.log('This is pending index', ind2)
      if(ind2 != -1) {
        arr.splice(ind2, 1)
        setDataBody(arr)
      
        delete obj[weekday]
        const updatedObj = Object.assign({[weekday]: {text: 'Available'}}, obj)
        tempData.splice(ind, 1)
        //tempData.slice(0, data.length-1)
        setDataSource([...tempData])
        return
      }

      return
    }

    const data = {
      calID: Number(key),
      startDate: new Date(record.start),
      endDate: new Date(record.end),
      teacherID: teacherID.tid,
      contactID: teacherID.contactID,
      isBooked: false
    }

    setDataBody([...dataBody, data])

    delete obj[weekday]
    const updatedObj = Object.assign({[weekday]: {text: 'Pending'}}, obj)
    //tempData.slice(0,)
    tempData.splice(ind, 1, updatedObj)
    setDataSource([...tempData])
  };

    // const handleSave = () => {
    // const bodyData = {
    //   teacherID: teacherID.tid,
    //   contactID: teacherID.contactID
    // }
    // axios.post('http://localhost:5500/request-appointment-approval', bodyData, {
    //   headers: {
    //     'authorization': JSON.parse(localStorage.getItem('token'))
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //     setVisible(false)
    //   })
    //   .catch(err => console.log(err))
    // };

    const onSubjectChange = (value) => {
      const arr = [...dataBody]
      arr.forEach(item => {
        item.subject = value
      })

      setDataBody(arr)
    }

    function onBlur() {
      console.log('blur');
    }
    
    function onFocus() {
      console.log('focus');
    }
    
    function onSearch(val) {
      console.log('search:', val);
    }

    const handleSave = () => {
      axios.post('http://localhost:5500/tutor/create-appointment', dataBody, {
        headers: {
          'authorization': JSON.parse(localStorage.getItem('token'))
        }
      })
        .then(res => {
          //console.log(res)
          openNotificationWithIcon('success')
          setVisible_(false)
        })
        .catch(err => console.log('This is error', err))
    }

    const convertTime12to24 = (time12h) => {
      const [time, modifier] = time12h.split(' ');
    
      let [hours, minutes] = time.split(':');
    
      if (hours === '12') {
        hours = '00';
      }
    
      if (modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
      }
    
      return `${hours}`;
    }

    const convertMinute12to24 = (time12h) => {
      const [time, modifier] = time12h.split(' ');
    
      let [hours, minutes] = time.split(':');
    
      if (hours === '12') {
        hours = '00';
      }
    
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
    
      return `${minutes}`;
    }

    const getDayandDate = (day, slot) => {
      console.log('This si sgetday and time ', day)
      const tempHourStart = convertTime12to24(slot.split('-')[0])
      const tempMinuteStart = convertMinute12to24(slot.split('-')[0])

      const tempHourEnd = convertTime12to24(slot.split('-')[1])
      const tempMinuteEnd = convertMinute12to24(slot.split('-')[1])

      //const start = new Date(new Date().getFullYear(), new Date().getMonth(), day, convertTime12to24(slot.split('-')[0]), convertMinute12to24(slot.split('-')[0]))
      var now = new Date()
      const start = new Date(`${now.getMonth()+1}-${day}-${now.getFullYear()} ${tempHourStart}:${tempMinuteStart}`);
      const end = new Date(`${now.getMonth()+1}-${day}-${now.getFullYear()} ${tempHourEnd}:${tempMinuteEnd}`);
      console.log('This is obaid', start, ' ', end)
      debugger
      if (start < now)
        start.setDate(start.getDate() + 7)
      if (end < now)
        end.setDate(end.getDate() + 7)

      setRecord(prevState => ({
        ...prevState,
        start,
        end
      }))
      console.log('This is setRecord', record)
    }

    const mapcolumns = columns.map((col) => {
        return {
            ...col,
            onCell: (record) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.dataIndex,
              handleSave: handleSave,
              onClick: () => {
                //const _title = col.title.split(' ')[1]
                console.log('I am here', col.value)
                const obj = dataSource.find(item => {
                  return item.key==record.key && item.hasOwnProperty(col.dataIndex)
                })
                
                if (obj) {
                  //confirm({
                    //title: 'Do you want to create appointment?',
                    //icon: <WarningOutlined twoToneColor="#52c41a" />,
                    //content: <div><DeleteFilled /></div>,
                    //onOk() {
                      //handleDelete(col.title, record.key, record.title)
                      console.log('This is record col', col)
                      getDayandDate(col.date, record.display)
                      //handleAdd(col.title, record.key, record.slot, col.value)
                      setRecord(prevState => ({
                        ...prevState,
                        day: col.dataIndex,
                        key: record.key
                      }))
                    //},
                    //onCancel() {},
                  //});
                } 
                }
            }),
        };
    });

    const setUserName = async () => {
      const userInfo = await localStorage.getItem("userInfo");
      const name = JSON.parse(userInfo);
      console.log("User Info", name);
      setUser(name.username);
    };
  
  
    const getAllTutors = async (user) => {
      const token = await localStorage.getItem("token");
      const myToken = JSON.parse(token);
      setLoading(true);
      try {
        const tutors = await axios.get(
          `contact/allcontacts?loginId=${user.loginId}&role=${user.userRole}`,
          {
            headers: {
              authorization: myToken,
            },
          }
        );
        console.log("All students", tutors.data.data);
        const allTutorsData = tutors.data.data;
        setAllTutors(allTutorsData);
        const userImgs = allTutorsData.map((item, index) => item.profileImage);
        setProfileImg(userImgs);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response) {
          toast.notify(
            "Request Timed out. Please Check your internet connectivity."
          );
        }
      }
    };

    const getInvitedUsers = async (user) => {
      const token = await localStorage.getItem("token");
      const myToken = JSON.parse(token);
      setLoading(true);
      try {
        const users = await axios.get(
          `contact/invitations?loginId=${user.loginId}&role=${user.userRole}`,
          {
            headers: {
              authorization: myToken,
            },
          }
        );
        console.log("All invited students", users.data.data);
        const allInvited = users.data.data;
        setAllInvited(allInvited);
        const userImgs = allInvited.map((item, index) => item.profileImage);
        setSiImg(userImgs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  

    const recommendedUsers = async (user) => {
      const token = await localStorage.getItem("token");
      const myToken = JSON.parse(token);
      setLoading(true);
      try {
        const recommendation = await axios.get(
          `contact/recommendation/?loginId=${user.loginId}&role=${user.userRole}`,
          {
            headers: {
              authorization: myToken,
            },
          }
        );
        console.log("All recommendation", recommendation.data.data);
        const allRecommendations = recommendation.data.data;
        setAllRecommendations(allRecommendations);
        const userImg = allRecommendations.map((item) => item.profileImage);
        setRImg(userImg);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  
  const listenCall = async () => {
    try {
      SocketData.on("initiateCall", (data) => {
        let repeate = setInterval(() => {
          audio.play();
        }, 3000);
        confirm({
          title: "Do you want to receive call?",
          icon: <VideoCameraOutlined />,
          content: "Click OK to receive call",
          onOk() {
            audio.pause();
            clearInterval(repeate);
            window.open(`${data.callUrl}`, "_blank");
          },
          onCancel() {
            clearInterval(repeate);
            audio.pause();
          },
        });
      });
    } catch (error) {
      console.log("ERROR, while dialing...", error.message);
    }
  };

  const sendInvite = async (invitedTo) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);

    try {
      let data = {
        invitedTo: invitedTo,
        invitedBy: isUserInfo.loginId,
        role: isUserInfo.userRole,
        username: user,
      };
      console.log("invitedTo", data);
      const invitation = await axios.post("contact", data, {
        headers: {
          authorization: myToken,
        },
      });

      console.log("Success", invitation);
      setInvitedId(invitedTo);
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation sent`,
          style: {
            zIndex: "999999",
          },
        });
        getAllTutors(isUserInfo);
        getPendingInvitations(isUserInfo);
        recommendedUsers(isUserInfo);
        getInvitedUsers(isUserInfo);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getPendingInvitations = async (isUserInfo) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    setLoading(true);
    console.log(myToken);
    try {
      const pendingInvitations = await axios.get(
        `contact/pendinginvites/?loginId=${isUserInfo.loginId}&role=${isUserInfo.userRole}`,
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      console.log("pendingInvitations Success", pendingInvitations.data.data);
      pendingInvitations && setPendingInvitations(pendingInvitations.data.data);
      const allPendingInvites = pendingInvitations.data.data;
      const userImgs = allPendingInvites.map(
        (item, index) => item.profileImage
      );
      setRiImg(userImgs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  const acceptInvitationHandler = async (value) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    const { invitedBy, invitedTo, role, isAccepted } = value;
    try {
      const acceptInvitation = await axios.put(
        "contact",
        {
          invitedBy: invitedBy,
          invitedTo: invitedTo,
          role: role,
          isAccepted,
          username: user,
        },
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation Accepted!`,
          style: {
            zIndex: "999999",
          },
        });
      });
      getAllTutors(isUserInfo);
      getPendingInvitations(isUserInfo);
      recommendedUsers(isUserInfo);
      getInvitedUsers(isUserInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectInvitationHandler = async (value) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    console.log("VALUE", value);
    const { invitedBy, invitedTo, role, isAccepted } = value;
    try {
      const rejectInvitation = await axios.put(
        "contact",
        {
          invitedBy: invitedBy,
          invitedTo: invitedTo,
          role: role,
          isAccepted,
          username: user,
        },
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation Rejected!`,
          style: {
            zIndex: "999999",
          },
        });
      });
      getAllTutors(isUserInfo);
      getPendingInvitations(isUserInfo);
      recommendedUsers(isUserInfo);
      getInvitedUsers(isUserInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const sentMessage = async (id) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    try {
      const contact = await axios.post(
        "chatcontact",
        {
          studentId: `${isUserInfo.loginId}`,
          teacherId: `${id}`,
          role: "student",
        },
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      contact.status && history.push("/student/chat");
    } catch (error) {
      console.log("Already exist!");
    }
    console.log("!!!", id);
  };
  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
      getPendingInvitations(res);
      recommendedUsers(res);
      getAllTutors(res);
      setUserName();
      getInvitedUsers(res);
    });
    listenCall();
  }, [SocketData]);
  var Xmas95 = new Date();
  var options = { month: 'long'};

  return (
    <div className="tab-wrapper">
      {visible_ && 
        <Modal
          title="Summary"
          centered
          visible={visible_}
          onOk={handleSave}
          onCancel={() => setVisible_(false)}
        >
          {teacherID.subjects.length >= 1 && <Select
            showSearch
            className="summary-dropdown"
            placeholder="Select a subject"
            optionFilterProp="children"
            onChange={onSubjectChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }

          >
            {teacherID.subjects[0] && <Option value={teacherID.subjects[0]}>{teacherID.subjects[0]}</Option>}
            {teacherID.subjects[1] && <Option value={teacherID.subjects[1]}>{teacherID.subjects[1]}</Option>}
            {teacherID.subjects[2] && <Option value={teacherID.subjects[2]}>{teacherID.subjects[2]}</Option>}
            {teacherID.subjects[3] && <Option value={teacherID.subjects[3]}>{teacherID.subjects[3]}</Option>}
            {teacherID.subjects[4] && <Option value={teacherID.subjects[4]}>{teacherID.subjects[4]}</Option>}
          </Select>
          }
            <div className="summary-detail-box"> {dataBody.map(item => (
            <div className="summary-detail">
              <p>Start: <span>{String(item.startDate)}</span></p>
              <p>End: <span>{String(item.endDate)}</span></p>
            </div>
          ))}
          </div>
        </Modal>
      }
      {visible && 
          <Modal
            title="Create Appointment"
            centered
            className="calendar-page"
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
            footer={[
              <div className="btn-row"> <Button className="float-right primary-btn" onClick={() => setVisible_(true)}>Save</Button></div>
            ]}
          >
          <div className="DateT">
              <button type="button" class="ant-btn previousBtn" onClick={() =>{prevWeek()
              prevWeekClone()}}><span>Previous</span></button>
              <button type="button" class="ant-btn nextBtn" onClick={() => {nextWeek()
                nextWeekClone()}}><span>Next</span></button>
            <h4 className="float-right my-3">{new Intl.DateTimeFormat('en-US', options).format(iDate)} {iDate.getFullYear()}</h4>        
          </div>
          {/* <Table
            showHeader={true}
            columns={mapcolumns}
            dataSource={dataSource}                               
            pagination={false}
            bordered
            scroll={{ y: 375 }}
            className="availability-calendar"
          /> */}

          {loadingSpin ?
            <Space size="middle">
            <Spin 
              size="large" 
            />
            <Table
                columns={mapcolumns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 375 }}
                bordered
                className="availability-calendar"
            />
            </Space>
            :
            <Table
                columns={mapcolumns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ y: 375 }}
                bordered
                className="availability-calendar"
            />
          }
        </Modal>
      }
     <Tabs defaultActiveKey="1" type="card" size={"large"}>
        <TabPane tab="Connected Tutors" key="1">
          <div id="current-tutor-wrap">
            <div className="current-tutor-left">
              {isLoading === true ? (
                <div className="example">
                  <Spin size="large" />
                </div>
              ) : isAllTutors ? (
                isAllTutors.map(
                  (student, index) =>
                    student.firstName && (
                      <>
                        <div className="reusedbox-content clearfix box-padding">
                          <div className="image-wrap">
                            <img
                              src={
                                profileImg.length >= 0 &&
                                profileImg[index] &&
                                profileImg[index][0]
                                  ? profileImg[index][0].profileImage
                                  : photo
                              }
                              alt=""
                            />
                          </div>
                          <div className="boxcontent ">
                            <h4>
                              {student.firstName} {student.lastName}
                            </h4>
                            {/* <span>Next session in:</span>
                                                    <em>10h:03m</em><br /> */}
                            <span>Subject:</span>
                            {student.subjects.map((subject) => (
                              <em
                                key={subject}
                                style={{
                                  textTransform: "capitalize",
                                  marginBottom: "6px",
                                }}
                              >
                                {subject}, &nbsp;
                              </em>
                            ))}
                            <br />
                            <a className="btn-cancel" onClick={ () => {
                              setVisible(true)
                              setTeacherID({
                                tid: student.userId,
                                contactID: student.contactID,
                                subjects: [...student.subjects]
                              })
                              }}>Edit</a>
                            <a className="btn-cancelborder">
                              End this Contract
                            </a>
                          </div>
                          <div className="box-otherlinks">
                            <ul>
                              <li>
                                <a
                                  className="bluebox"
                                  onClick={() => sentMessage(student.userId)}
                                >
                                  <img src={msgIcon} alt="icon" />
                                </a>
                              </li>
                              {/* <li>
                              <a className="greenbox" onClick={null}>
                                <img src={CallIcon} alt="icon" />
                              </a>
                            </li> */}
                            </ul>
                          </div>
                        </div>
                      </>
                    )
                )
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
            <div className="current-tutor-right">
              <Tabs type="card">
                <TabPane tab="Recommended" key="1">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isLoading === true ? (
                        <div className="example">
                          <Spin size="large" />
                        </div>
                      ) : (
                        isAllRecommendations.map(
                          (tutor, index) =>
                            tutor.firstName && (
                              <>
                                <div class="right-content">
                                  <div class="currenttutuors-tab">
                                    <div class="reusedbox-content clearfix">
                                      <div class="image-wrap">
                                        <img
                                          src={
                                            rImg.length >= 0 &&
                                            rImg[index] &&
                                            rImg[index][0]
                                              ? rImg[index][0].profileImage
                                              : photo
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div
                                        class="boxcontent"
                                        style={{ width: "auto" }}
                                      >
                                        <h4>
                                          {tutor.firstName} {tutor.lastName}
                                        </h4>
                                        <span>Interest: </span>
                                        {tutor.subjects.map((subject) => (
                                          <em
                                            key={subject}
                                            style={{
                                              textTransform: "capitalize",
                                              marginBottom: "8px",
                                            }}
                                          >
                                            {subject}, &nbsp;
                                          </em>
                                        ))}
                                        <br />
                                        <span>Spoken Languages: </span>
                                        {tutor.languages.map((language) => (
                                          <em
                                            key={language}
                                            style={{ marginBottom: "8px" }}
                                          >
                                            {language}, &nbsp;
                                          </em>
                                        ))}
                                        <br />
                                        <span>Country: </span>
                                        <em style={{ marginBottom: "8px" }}>
                                          {" "}
                                          {tutor.country}
                                        </em>
                                        <br />
                                      </div>
                                      <div
                                        style={{
                                          textAlign: "right",
                                          marginTop: "90px",
                                        }}
                                      >
                                        {isUserInfo &&
                                          isUserInfo.userRole !== "tutor" && (
                                            <a
                                              className="green-btn"
                                              onClick={() =>
                                                sendInvite(tutor.userId)
                                              }
                                              // onClick = {() => {
                                              //   setTutorID(tutor.userId)
                                              //   showCalendar()
                                              // }}
                                            >
                                              Send Invitation
                                            </a>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                        )
                      )}
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Sent Invitations" key="2">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isLoading === true ? (
                        <div className="example">
                          <Spin size="large" />
                        </div>
                      ) : isAllInvited ? (
                        isAllInvited.map(
                          (tutor, index) =>
                            tutor.firstName && (
                              <>
                                <div class="right-content">
                                  <div class="currenttutuors-tab">
                                    <div class="reusedbox-content clearfix">
                                      <div class="image-wrap">
                                        <img
                                          src={
                                            siImg.length >= 0 &&
                                            siImg[index] &&
                                            siImg[index][0]
                                              ? siImg[index][0].profileImage
                                              : photo
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div
                                        class="boxcontent"
                                        style={{ width: "auto" }}
                                      >
                                        <h4>
                                          {tutor.firstName} {tutor.lastName}
                                        </h4>
                                        <span>Interest: </span>
                                        {tutor.subjects.map((subject) => (
                                          <em
                                            key={subject}
                                            style={{
                                              textTransform: "capitalize",
                                              marginBottom: "8px",
                                            }}
                                          >
                                            {subject}, &nbsp;
                                          </em>
                                        ))}
                                        <br />
                                        <span>Spoken Languages: </span>
                                        {tutor.languages.map((language) => (
                                          <em
                                            key={language}
                                            style={{ marginBottom: "8px" }}
                                          >
                                            {language}, &nbsp;
                                          </em>
                                        ))}
                                        <br />
                                        <span>Country: </span>
                                        <em style={{ marginBottom: "8px" }}>
                                          {" "}
                                          {tutor.country}
                                        </em>
                                        <br />
                                      </div>
                                      {/* <div style={{ textAlign: 'right'}}>
                                                                        {
                                                                                <a className="green-btn-disabled" disabled>Invitation sent</a>
                                                                        }
                                                                    </div> */}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                        )
                      ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      )}
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Recieved Invitations" key="3">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isLoading === true ? (
                        <div className="example">
                          <Spin size="large" />
                        </div>
                      ) : isPendingInvitations ? (
                        isPendingInvitations.map((tutor, index) => (
                          <>
                            <div class="right-content">
                              <div class="currenttutuors-tab">
                                <div class="reusedbox-content clearfix">
                                  <div class="image-wrap">
                                    <img
                                      src={
                                        riImg.length >= 0 &&
                                        riImg[index] &&
                                        riImg[index][0]
                                          ? riImg[index][0].profileImage
                                          : photo
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    class="boxcontent"
                                    style={{ width: "auto" }}
                                  >
                                    <h4>
                                      {tutor.firstName} {tutor.lastName}
                                    </h4>
                                    <span>Interest: </span>
                                    {tutor.subjects.map((subject) => (
                                      <em
                                        key={subject}
                                        style={{
                                          textTransform: "capitalize",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        {subject}, &nbsp;
                                      </em>
                                    ))}
                                    <br />
                                    <span>Spoken Languages: </span>
                                    {tutor.languages.map((language) => (
                                      <em
                                        key={language}
                                        style={{ marginBottom: "8px" }}
                                      >
                                        {" "}
                                        {language}, &nbsp;{" "}
                                      </em>
                                    ))}
                                    <br />
                                    <span>Country: </span>
                                    <em style={{ marginBottom: "8px" }}>
                                      {" "}
                                      {tutor.country}
                                    </em>
                                    <br />
                                  </div>
                                  <div style={{ textAlign: "right" }}>
                                    <a
                                      className="accept-btn"
                                      onClick={() =>
                                        acceptInvitationHandler({
                                          invitedBy: tutor.userId,
                                          invitedTo: isUserInfo.loginId,
                                          role: isUserInfo.userRole,
                                          isAccepted: true,
                                        })
                                      }
                                    >
                                      Accept
                                    </a>
                                    &nbsp;&nbsp;
                                    <a
                                      className="reject-btn"
                                      onClick={() =>
                                        rejectInvitationHandler({
                                          invitedBy: tutor.userId,
                                          invitedTo: isUserInfo.loginId,
                                          role: isUserInfo.userRole,
                                          isAccepted: false,
                                        })
                                      }
                                    >
                                      Reject
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      )}
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Landing;