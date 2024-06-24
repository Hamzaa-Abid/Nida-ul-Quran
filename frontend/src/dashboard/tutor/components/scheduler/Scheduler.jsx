import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal, Popover, notification, Menu, Dropdown, Space, Spin } from 'antd';
import { CheckCircleTwoTone, CheckOutlined, DeleteFilled,FieldTimeOutlined, DeleteOutlined,FileTextOutlined,GlobalOutlined, UserOutlined, WarningOutlined, CalendarOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//style
import './style.css'
//axios
import axios from 'axios'
import dayjs from 'dayjs';
//Editable Context
const EditableContext = React.createContext();
const token = JSON.parse(localStorage.getItem('token')) 
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

const Scheduler = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    country: '',
    subjects: []
  })
  // const [columns, setColumn] = useState(getColumns(new Date()));

  const getColumns = (date) => {
    let date1 = date
    let date2 = date
    const columns = [
      {
        title: '',
        dataIndex: 'slot',
        width:'100px',
      },
      {
        title: <span><span>{new Date(date1.setDate(date1.getDate() - (date1.getDay() - 1) + 0)).getDate()}</span> Mon</span>,
        dataIndex: 'Monday',
        date_:new Date(date2.setDate(date2.getDate() - (date2.getDay() - 1) + 0)).getDate(),
        value: '1',    
        render: (item, record) => data.length >= 1 ? (
        item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p><UserOutlined /> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><GlobalOutlined /> {item.student ? item.student.country : ''}</p><p><FileTextOutlined /> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" arrow><span className="tag-color-available">Available</span></Dropdown>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
          : '') : null  
      },
      {
        title:  <span><span>{new Date(date1.setDate(date1.getDate() - (date1.getDay() - 1) + 1)).getDate()}</span> Tue</span>,
        dataIndex: 'Tuesday',
        date_:new Date(date2.setDate(date2.getDate() - (date2.getDay() - 1) + 1)).getDate(),
        value: '2',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p><UserOutlined /> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><GlobalOutlined /> {item.student ? item.student.country : ''}</p><p><FileTextOutlined /> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" arrow><span className="tag-color-available">Available</span></Dropdown>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null       },
      {
        title: <span><span>{new Date(date1.setDate(date1.getDate() - (date1.getDay() - 1) + 2)).getDate()}</span> Wed</span>,
        dataIndex: 'Wednesday',
        date_: new Date(date2.setDate(date2.getDate() - (date2.getDay() - 1) + 2)).getDate(),
        value: '3',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p><UserOutlined /> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><GlobalOutlined /> {item.student ? item.student.country : ''}</p><p><FileTextOutlined /> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" arrow><span className="tag-color-available">Available</span></Dropdown>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null         },
      {
        title: <span><span>{new Date(date1.setDate(date1.getDate() - (date1.getDay() - 1) + 3)).getDate()}</span> Thu</span>,
        dataIndex: 'Thursday',
        date_: new Date(date2.setDate(date2.getDate() - (date2.getDay() - 1) + 3)).getDate(),
        value: '4',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p><UserOutlined /> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><GlobalOutlined /> {item.student ? item.student.country : ''}</p><p><FileTextOutlined /> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" arrow><span className="tag-color-available">Available</span></Dropdown>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null        },
      {
        title:  <span><span>{new Date(date1.setDate(date1.getDate() - (date1.getDay() - 1) + 4)).getDate()}</span> Fri</span>,
        dataIndex: 'Friday',
        date_:new Date(date2.setDate(date2.getDate() - (date2.getDay() - 1) + 4)).getDate(),
        value: '5',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p><UserOutlined /> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><GlobalOutlined /> {item.student ? item.student.country : ''}</p><p><FileTextOutlined /> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" arrow><span className="tag-color-available">Available</span></Dropdown>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null        },
      {
        title: <span><span>{new Date(date1.setDate(date1.getDate() - (date1.getDay() - 1) + 5)).getDate()}</span> Sat</span>,
        dataIndex: 'Saturday',
        date_: new Date(date2.setDate(date2.getDate() - (date2.getDay() - 1) + 5)).getDate(),
        value: '6',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p><UserOutlined /> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><span><GlobalOutlined /></span> {item.student ? item.student.country : ''}</p><p><FileTextOutlined /> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" arrow><span className="tag-color-available">Available</span></Dropdown>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null          },
      {
        title: <span><span>{new Date(date1.setDate(date1.getDate() - (date1.getDay() - 1) + 6)).getDate()}</span> Sun</span>,
        dataIndex: 'Sunday',
        date_: date+6,
        value: '0',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p><UserOutlined /> {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p><GlobalOutlined /> {item.student ? item.student.country : ''}</p><p><FileTextOutlined /> {item.student ? item.student.subjects[0] : ''}</p></div>} title="Student Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" arrow><span className="tag-color-available">Available</span></Dropdown>: (item.text=='Leave' ? <Dropdown overlay={menu2} trigger={['click']} placement="bottomLeft" arrow><span className="tag-color-leave">{item.text}</span></Dropdown> : <span>{item.text}</span>)))
            : '') : null         }
    ];

    //setColumn(columns)
    return columns
    }
  const [columns, setColumn] = useState(getColumns(new Date()));
  const [dataSource, setDataSource] = useState(data)
  const [record, setRecord] = useState({
    start: '',
    end: '',
    day: '',
    key: ''
  })
  const [objRecord, setObjRecord] = useState({
    start: '',
    end: '',
    day: '',
    key: '',
    value: ''
  })
  const [dataBody, setDataBody] = useState([])
  const [leaveBody, setLeaveBody] = useState([])
  const [leaveDeleteBody, setLeaveDeleteBody] = useState([])
  const [isShown, setIsShown] = useState(false);
  const [menuKey, setMenuKey] = useState(-1)
  const [weekDate, setWeekDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [leaveDetails, setLeaveDetails] = useState([])
  // const [student, setStudentDetails] = useState({
  //   name: '',
  //   country: '',
  //   subjects: []
  // })
  const [appointments, setAppointments] = useState()
  const [iDate, setInitialDate] = useState(new Date());
  //Hammad Start
  const prevWeek = () => {
    let myDate = new Date(iDate);
    myDate.setDate(myDate.getDate() - 8);
    console.log('This is prevWeek', myDate)
    setInitialDate(myDate);
    let newCol = getColumns(myDate);
    setColumn(newCol);
  };

  const nextWeek = () => {
    let newDate = dayjs(iDate).add(6, "day").toDate();
    console.log(newDate);
    const colDate = newDate;
    setInitialDate(newDate);
    let newCol = getColumns(colDate);
    setColumn(newCol);
  };
  //Hammad end

  // useEffect(() => {
  //   const now=new Date()
  //   if(weekDate==now){
  //     console.log('I was here')
  //     return
  //   } else {
  //     getData()
  //   }
  // }, [weekDate, columns])

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Success',
      description:
        'The schedule is updated.',
    });
  };

  const getData = async() => {
    var tempData = [...data];
    setLoading(true)

    await axios.get('http://localhost:5500/tutor/get-schedule', {
    headers: {
      'authorization': token 
    }
  })
    .then((res) => {
      //This is to be temp//
      setDataBody([...res.data.data])
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
      console.log('The promise is resolved')
      const d = iDate
      const n = d.toISOString()
      var userInfo = JSON.parse(localStorage.getItem('userInfo'))
      axios.get(`http://localhost:5500/get-appointment-by-id?teacherID=${userInfo.loginId}&weekDate=${n}`, {
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
            item.text = 'Pending';
            delete obj[day]
            const updatedObj = Object.assign({[day]: item}, obj)
            tempData.splice(ind, 1, updatedObj)
            setDataSource([...tempData])
          }
          setAppointments([...arr])
        })
      })
      .then(res => {
        const d = iDate
        const n = d.toISOString()
        axios.get(`http://localhost:5500/get-leaves-by-id?teacherID=${userInfo.loginId}&weekDate=${n}`, {
          headers: {
            'authorization': token
          }
        })
        .then(res => {
          let arr = []
          res.data.data.forEach(curr => arr.push({
            schedule: curr.schedule,
            _id: curr._id
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
              item.text = 'Leave'
              delete obj[day]
              const updatedObj = Object.assign({[day]: item}, obj)
              tempData.splice(ind, 1, updatedObj)
              setDataSource([...tempData])
              setLeaveDetails([...arr])
          })
        })
        .then(res => {
          setLoading(false)
        })
      })
      .catch(err => console.log(err))
      //setLoading(false)
    })
    .catch(err => console.log(err))
  }
  useEffect(() => {
    getData()
  }, [iDate])

  useEffect(() => {
    if(record.start !== '') {
      handleAdd(record.day, record.key)
    }
  }, [record])

  useEffect(() => {
    if(objRecord) {
      if (menuKey == 0) {
        handleLeave(objRecord.day)
      }
      if (menuKey == 1) {
        handlePermanentlyDelete(objRecord.day)
      }
      if (menuKey == 2) {
        handleLeaveDelete(objRecord.day)
      }
    }
  }, [objRecord])
  //Handle Delete
  const handleDelete = (day, key, slot, val) => {
    let weekday;
    switch (day) {
      case 'Sunday':
        weekday = 0
        break;
      case 'Monday':
        weekday = 1
        break;
      case 'Tuesday':
        weekday = 2
        break;
      case 'Wednesday':
        weekday = 3
        break;
      case 'Thursday':
        weekday = 4
        break;
      case 'Friday':
        weekday = 5
        break;
      case 'Saturday':
        weekday = 6
        break;
      
      default:
        break;
    }
    const arr = [...dataBody]

    const ind = dataSource.findIndex((item) => {
      return item.key==key
    })
    const ind2 = arr.findIndex((item) => {
      return item.calID==key && item.weekday==weekday
    })
    const obj = dataSource.find(item => {
      return item.key==key && item.hasOwnProperty(day)
    })

    if (obj[day].text == 'Available' || obj[day].text == 'Pending' || obj[day].text == 'Scheduled' || obj[day].text == 'Leave') {
      return
    } else {
      delete obj[day]
      dataSource.splice(ind, 1, obj)
      setDataSource([...dataSource])
    
      arr.splice(ind2, 1)
      setDataBody([...arr])
    }
  };
  //Handle Add
  const handleAdd = (day, key) => {
    const ind = dataSource.findIndex((item) => {
        return item.key==key
    })
    const obj = dataSource.find((item) => {
        return item.key==key
    })

    const updatedObj = Object.assign({[day]: {text: <CheckOutlined />}}, obj)
    dataSource.splice(ind, 1, updatedObj)

    let weekday;
    switch (day) {
      case 'Sunday':
        weekday = 0
        break;
      case 'Monday':
        weekday = 1
        break;
      case 'Tuesday':
        weekday = 2
        break;
      case 'Wednesday':
        weekday = 3
        break;
      case 'Thursday':
        weekday = 4
        break;
      case 'Friday':
        weekday = 5
        break;
      case 'Saturday':
        weekday = 6
        break;
      
      default:
        break;
    }

    const body = {
      calID: Number(updatedObj.key),
      weekday: weekday,
      startHour: record.start.getHours(),
      startMinute: record.start.getMinutes(),
      endHour:  record.end.getHours(),
      endMinute: record.end.getMinutes()
    }
    setDataBody([...dataBody, body])
    setDataSource([...dataSource])
  };

  const handleLeave = (day) => {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const ind = dataSource.findIndex((item) => {
      return item.key==objRecord.key
    })
  
    const obj = dataSource.find((item) => {
      return item.key==objRecord.key
    })

    if(obj[day].text != 'Available') {
      setObjRecord(null)
      setMenuKey(-1)
      return
    }

    delete obj[day]
    const updatedObj = Object.assign({[day]: {text: "Leave"}}, obj)
    dataSource.splice(ind, 1, updatedObj)

    const body = {
      calID: Number(updatedObj.key),
      startDate: new Date(objRecord.start),
      endDate: new Date(objRecord.end),
      teacherID: `${userInfo.loginId}`
    }
    setObjRecord(null)
    setMenuKey(-1)
    setLeaveBody([...leaveBody, body])
    setDataSource([...dataSource])
  }

  const handlePermanentlyDelete = (day) => {
    let weekday;
    switch (objRecord.day) {
      case 'Sunday':
        weekday = 0
        break;
      case 'Monday':
        weekday = 1
        break;
      case 'Tuesday':
        weekday = 2
        break;
      case 'Wednesday':
        weekday = 3
        break;
      case 'Thursday':
        weekday = 4
        break;
      case 'Friday':
        weekday = 5
        break;
      case 'Saturday':
        weekday = 6
        break;
      
      default:
        break;
    }
    const ind = dataSource.findIndex((item) => {
      return item.key==objRecord.key
    })
    const ind2 = dataBody.findIndex((item) => {
      return item.calID==objRecord.key && item.weekday==weekday
    })
  
    const obj = dataSource.find((item) => {
      return item.key==objRecord.key
    })

    if(obj[day].text != 'Available') {
      setObjRecord(null)
      setMenuKey(-1)
      return
    }

    delete obj[day]

    dataBody.splice(ind2, 1)

    setObjRecord(null)
    setMenuKey(-1)
    setDataSource([...dataSource])
    setDataBody([...dataBody])
  }

  const handleLeaveDelete = (day) => {
    console.log('This is handle leave delete')
    let weekday;
    switch (objRecord.day) {
      case 'Sunday':
        weekday = 0
        break;
      case 'Monday':
        weekday = 1
        break;
      case 'Tuesday':
        weekday = 2
        break;
      case 'Wednesday':
        weekday = 3
        break;
      case 'Thursday':
        weekday = 4
        break;
      case 'Friday':
        weekday = 5
        break;
      case 'Saturday':
        weekday = 6
        break;
      
      default:
        break;
    }
    const ind = dataSource.findIndex((item) => {
      return item.key==objRecord.key
    })
    const obj1 = leaveDetails.find((item) => {
      return item.schedule.calID==objRecord.key && item.schedule.weekday==weekday
    })
    const obj2 = dataSource.find((item) => {
      return item.key==objRecord.key
    })
    setLeaveDeleteBody([...leaveDeleteBody, obj1._id])
    console.log('This is leave obj', obj1)
    
    delete obj2[day]
    
    setObjRecord(null)
    setMenuKey(-1)
    setDataSource([...dataSource])
    setDataBody([...dataBody])
  }

  const handleMenuClick = (e) => {
    setMenuKey(e.key)
  }

  const handleStudentDetails = (day, key) => {
    let weekday;
    switch (day) {
      case 'Sunday':
        weekday = 0
        break;
      case 'Monday':
        weekday = 1
        break;
      case 'Tuesday':
        weekday = 2
        break;
      case 'Wednesday':
        weekday = 3
        break;
      case 'Thursday':
        weekday = 4
        break;
      case 'Friday':
        weekday = 5
        break;
      case 'Saturday':
        weekday = 6
        break;
      
      default:
        break;
    }
    const obj = appointments.find(item => {
      if(typeof item.schedule==='undefined') {
        return
      }
      return item.schedule.weekday==weekday && item.schedule.calID==String(key)
    })

    setStudentDetails({
      name: obj.student.firstName+' '+obj.student.lastName,
      country: obj.student.country,
      subjects: obj.student.subjects
    })
    console.log('This is obj', obj)
  }
 
  const handleSave = () => {
    axios.post('http://localhost:5500/tutor/create-schedule', dataBody, {
      headers: {
        'authorization': token
      }
    })
      .then(res => {
        console.log(res)
        axios.post('http://localhost:5500/create-leaves', leaveBody, {
          headers: {
            'authorization': token
          }
        })
        .then(() => {
          axios.post('http://localhost:5500/delete-tutor-leaves', leaveDeleteBody, {
            headers: {
              'authorization': token
            }
          })
          .then((res) => console.log('This is leaves delete'))
        })
        .then(res => {
          openNotificationWithIcon('success')
          getData()
          console.log(res)
        })
      })
      .catch(err => {
        console.log(err)
        openNotificationWithIcon('warning')
      })
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
  
    if (modifier === 'pm') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${minutes}`;
  }

  const getDayandDate = (day, slot) => {
    const tempHourStart = convertTime12to24(slot.split('-')[0])
    const tempMinuteStart = convertMinute12to24(slot.split('-')[0])

    const tempHourEnd = convertTime12to24(slot.split('-')[1])
    const tempMinuteEnd = convertMinute12to24(slot.split('-')[1])
    var now = new Date()
    const start = new Date(`${now.getMonth()+1}-${day}-${now.getFullYear()} ${tempHourStart}:${tempMinuteStart}`);
    const end = new Date(`${now.getMonth()+1}-${day}-${now.getFullYear()} ${tempHourEnd}:${tempMinuteEnd}`);
    
    if (start < now)
      start.setDate(start.getDate() + 7)
    if (end < now)
      end.setDate(end.getDate() + 7)
  
    if (start < now)
      start.setDate(start.getDate() + 7)
  
    if (end < now)
      end.setDate(end.getDate() + 7)

    if (record.day == '') {
      setObjRecord(prevState => ({
        ...prevState,
        start,
        end
      }))
      console.log('This is setObjRecord', objRecord)
    } else {
      setRecord(prevState => ({
        ...prevState,
        start,
        end
      }))
      console.log('This is setRecord', record)
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
    <Menu.Item key="0" icon={<CalendarOutlined style={{ color: '#982ee7' }} />}><span className="calendar-dropdown-text">Do you want to take a leave?</span></Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1" icon={<DeleteOutlined style={{ color: '#f44336' }} />}><span className="calendar-dropdown-text">Do you want to delete this slot?</span></Menu.Item>
  </Menu>
  )

  const menu2 = (
    <Menu onClick={handleMenuClick}>
    <Menu.Item key="2" icon={<DeleteOutlined style={{ color: '#f44336' }} />}><span className="calendar-dropdown-text">Do you want to delete?</span></Menu.Item>
    </Menu>
  )

  const mapcolumns = columns.map((col) => {
      return {
          ...col,
          onCell: (record) => ({
            record,
            dataIndex: col.dataIndex,
            title: col.dataIndex,
            //onMouseLeave: () => setIsShown(false),
            //handleSave: handleSave,
            onMouseEnter: () => {
              const obj = dataSource.find(item => {
                return item.key==record.key && item.hasOwnProperty(col.dataIndex)
              })

              if(obj) {
                if(obj[col.dataIndex]=='Scheduled') {
                  handleStudentDetails(col.dataIndex, record.key)
                }
              }
            },
            onClick: () => {
              console.log('I am here', record)
              const obj = dataSource.find(item => {
                return item.key==record.key && item.hasOwnProperty(col.dataIndex)
              })
              
              if (obj) {
                //confirm({
                  //title: 'Do you want to delete this slot?',
                  //icon: <WarningOutlined twoToneColor="#52c41a" />,
                  //content: <div><DeleteFilled /></div>,
                  //onOk() {
                    if (obj[col.dataIndex].text=='Pending' || obj[col.dataIndex].text=='Available' || obj[col.dataIndex].text=='Scheduled' || obj[col.dataIndex].text=='Leave') {
                      setRecord(prevState => ({
                        ...prevState,
                        day: '',
                        key: ''
                      }))
                      getDayandDate(col.date_, record.display)
                      setObjRecord(prevState => ({
                        ...prevState,
                        day: col.dataIndex,
                        key: record.key
                      }))
                    } else {
                      handleDelete(col.dataIndex, record.key, record.title, col.value)
                    }
                    
                  //},
                  //onCancel() {},
                //});
              } else {
                // confirm({
                //   title: 'Do you want to select this slot?',
                //   icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
                //   //content: <div><DeleteFilled /></div>,
                //   onOk() {
                    setObjRecord(null)
                    getDayandDate(col.date_, record.display)
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
              //setVisible(true)
              }
          }),
      };
  });

  function showConfirm() {
      Modal.confirm({
        title: 'Do you want to update the schedule?',
        icon: <ExclamationCircleOutlined />,
        //content: 'Some descriptions',
        onOk() {
          handleSave();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
  }

    var options = { month: 'long'};
    var clone = [...mapcolumns]
    return (
      <section id="main-content">
      <div className="container-fluid">
        <div className="calendar-page">
            <div className="DateT">
              <button type="button" class="ant-btn previousBtn" onClick={prevWeek}><span>Previous</span></button>
              <button type="button" class="ant-btn nextBtn" onClick={nextWeek}><span>Next</span></button>
              <h3 className="float-right my-3">{new Intl.DateTimeFormat('en-US', options).format(iDate)} {iDate.getFullYear()}</h3>        
          </div>
          {loading ?
            <Space size="middle">
            <Spin 
              size="large" 
            />
            <Table
                columns={clone}
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
            <div className="btn-row"> <Button className="float-right primary-btn" onClick={showConfirm}>Save</Button></div>
        </div>
      </div>
      </section>
    )
}

export default Scheduler;