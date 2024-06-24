import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal, Popover, Space, Spin } from 'antd';
import { CheckCircleTwoTone, DeleteFilled, WarningOutlined } from '@ant-design/icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//style
import './style.css'
//axios
import axios from 'axios'
import dayjs from 'dayjs';
//Editable Context
const EditableContext = React.createContext();
// const start = new Date();
// const end = new Date(new Date().setMinutes(start.getMinutes() + 30)); 
var token = JSON.parse(localStorage.getItem('token'))

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
        value: '1',    
        render: (item, record) => data.length >= 1 ? (
        item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p>Name: {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p>Country: {item.student ? item.student.country : ''}</p><p>Subjects: {item.student ? item.student.subjects[0] : ''}</p></div>} title="Teacher Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
          : '') : null  
      },
      {
        title:  <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 1)).getDate()}</span> Tue</span>,
        dataIndex: 'Tuesday',
        //editable: true
        value: '2',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p>Name: {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p>Country: {item.student ? item.student.country : ''}</p><p>Subjects: {item.student ? item.student.subjects[0] : ''}</p></div>} title="Teacher Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null         },
      {
        title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 2)).getDate()}</span> Wed</span>,
        dataIndex: 'Wednesday',
        value: '3',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p>Name: {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p>Country: {item.student ? item.student.country : ''}</p><p>Subjects: {item.student ? item.student.subjects[0] : ''}</p></div>} title="Teacher Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null          },
      {
        title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 3)).getDate()}</span> Thu</span>,
        dataIndex: 'Thursday',
        value: '4',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p>Name: {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p>Country: {item.student ? item.student.country : ''}</p><p>Subjects: {item.student ? item.student.subjects[0] : ''}</p></div>} title="Teacher Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null          },
      {
        title:  <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 4)).getDate()}</span> Fri</span>,
        dataIndex: 'Friday',
        value: '5',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p>Name: {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p>Country: {item.student ? item.student.country : ''}</p><p>Subjects: {item.student ? item.student.subjects[0] : ''}</p></div>} title="Teacher Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null          },
      {
        title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 5)).getDate()}</span> Sat</span>,
        dataIndex: 'Saturday',
        value: '6',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p>Name: {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p>Country: {item.student ? item.student.country : ''}</p><p>Subjects: {item.student ? item.student.subjects[0] : ''}</p></div>} title="Teacher Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null            },
      {
        title: <span><span>{new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 6)).getDate()}</span> Sun</span>,
        dataIndex: 'Sunday',
        value: '0',
        render: (item, record) => data.length >= 1 ? (
          item ? item.text=='Pending'?<Popover placement="topLeft" content={<p>{record.calID}</p>} title="Title"><span className="tag-color-pending">{item.text}</span></Popover>: (item.text=='Scheduled' ? <Popover placement="topLeft" content={<div><p>Name: {item.student ? item.student.firstName+' '+item.student.lastName : ''}</p><p>Country: {item.student ? item.student.country : ''}</p><p>Subjects: {item.student ? item.student.subjects[0] : ''}</p></div>} title="Teacher Details"><span className="tag-color-approved">{item.text}</span></Popover> : (item.text=='Available' ? <span className="tag-color-available">Available</span>: (item.text=='Leave' ? <span className="tag-color-leave">{item.text}</span> : <span>{item.text}</span>)))
            : '') : null           }
    ];
    return columns
    }

    //Hammad Start
    const [iDate, setInitialDate] = useState(new Date());
    const [columns, setColumn] = useState(getColumns(new Date()));
    const prevWeek = () => {
      let myDate = new Date(iDate);
      myDate.setDate(myDate.getDate() - 8);
      setWeekDate(myDate)
      setInitialDate(myDate);
      let newCol = getColumns(myDate);
      setColumn(newCol);
  
      getData()
    };
  
    const nextWeek = () => {
      let newDate = dayjs(iDate).add(6, "day").toDate();
      console.log(newDate);
      const colDate = newDate;
      setInitialDate(newDate);
      setWeekDate(newDate)
      let newCol = getColumns(colDate);
      setColumn(newCol);
  
      getData()
    };
    //Hammad end
    const [weekDate, setWeekDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState(data)
  const [record, setRecord] = useState({
    start: '',
    end: '',
    day: '',
    key: ''
  })

  let tempData = [...data]
  
  useEffect(() => {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log('This is student userInfo', userInfo)
    console.log('This is student login id', userInfo.loginId)
    getData()
  }, [])

  useEffect(() => {
    if(record.start !== '') {
      console.log('Before going to handle add', record.start)
      handleAdd(record.day, record.key)
    }
  }, [record])

  const getData = async() => {
    setLoading(true)
    var userInfo = JSON.parse(localStorage.getItem('userInfo'))
    await axios.get(`http://localhost:5500/get-appointment-by-id?studentID=${userInfo.loginId}&weekDate=${weekDate}`, {
    headers: {
      'authorization': token 
    }
  })
    .then((res) => {
      let arr = []
      res.data.data.forEach(curr => arr.push({
        schedule: curr.schedule,
        isBooked: curr.isBooked,
        student: curr.teacher[0]
      }))
      //let tempData = [...dataSource];
      console.log('This is student avail calendar', arr)
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
          setDataSource([...tempData, tempData])
        } else {
          item.text = 'Pending';
          delete obj[day]
          const updatedObj = Object.assign({[day]: item}, obj)
          tempData.splice(ind, 1, updatedObj)
          setDataSource([...tempData, tempData])
        }
        //setAppointments([...arr, arr])
        setLoading(false)
      })       
    })
    .catch(err => console.log(err))
  }

  const handleDelete = (day, key, slot, val) => {
    const ind = data.findIndex((item) => {
      return item.key==key
    })
    const obj = data.find(item => {
      return item.key==key && item.hasOwnProperty(day)
    })

    console.log('This is value', val)

    const dataBody = {
      calID: Number(key),
      weekday: Number(val)
    }
    if(obj) {
    axios.post('http://localhost:5500/tutor/delete-schedule', dataBody, {
      headers: {
        'authorization':  token
      }
    })
      .then(res => {
        console.log(res)
        //if(obj) {
          delete obj[day]
    
          //const updatedObj = Object.assign({[day]: 'Available'}, obj)
          data.splice(ind, 1, obj)
          setDataSource([...data, data])
        
      })
      .catch(err => console.log(err))
    }
    
    console.log('This object is to be deleted', obj)
    console.log('This is deleted object', obj)
  };

  const handleAdd = (day, key) => {
    console.log(day, key)
    //getDayandDate(value, slot)

    console.log('This is start', record.start)
    console.log('This is end date', record.end)

    const ind = data.findIndex((item) => {
        return item.key==key
    })
    const obj = data.find((item) => {
        return item.key==key
    })

    const updatedObj = Object.assign({[day]: 'Available'}, obj)
    data.splice(ind, 1, updatedObj)
    console.log('This is data', data)

    const dataBody = {
      calID: Number(updatedObj.key),
      startDate: new Date(record.start),
      endDate: new Date(record.end)
    }

    axios.post('http://localhost:5500/tutor/create-schedule', dataBody, {
      headers: {
        'authorization': token
      }
    })
      .then(res => {
        console.log(res)
        setDataSource([...data, data])
      })
      .catch(err => console.log(err))

    //setDataSource([...data, data])     
  };

    const handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource({
        dataSource: newData,
    });
    };

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
      const tempHourStart = convertTime12to24(slot.split('-')[0])
      const tempMinuteStart = convertMinute12to24(slot.split('-')[0])

      const tempHourEnd = convertTime12to24(slot.split('-')[1])
      const tempMinuteEnd = convertMinute12to24(slot.split('-')[1])

      //const start = new Date(new Date().getFullYear(), new Date().getMonth(), day, convertTime12to24(slot.split('-')[0]), convertMinute12to24(slot.split('-')[0]))
      var now = new Date()
      const start = new Date(
                     now.getFullYear(),
                     now.getMonth(),
                     now.getDate() + (7 + day - now.getDay()) % 7,
                     tempHourStart,
                     tempMinuteStart)
    
      if (start < now)
        start.setDate(start.getDate() + 7)

      const end = new Date(
                      now.getFullYear(),
                      now.getMonth(),
                      now.getDate() + (7 + day - now.getDay()) % 7,
                      tempHourEnd,
                      tempMinuteEnd)
    
      if (end < now)
        end.setDate(end.getDate() + 7)

      setRecord(prevState => ({
        ...prevState,
        start,
        end
      }))

      console.log('This is setRecord', record)

    }

    const { confirm } = Modal;

    const mapcolumns = columns.map((col) => {
        return {
            ...col,
            onCell: (record) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: handleSave,
              // onClick: () => {
              //   console.log('I am here', record)
              //   const obj = data.find(item => {
              //     return item.key==record.key && item.hasOwnProperty(col.title)
              //   })
                
              //   if (obj) {
              //     confirm({
              //       title: 'Do you want to delete this slot?',
              //       icon: <WarningOutlined twoToneColor="#52c41a" />,
              //       //content: <div><DeleteFilled /></div>,
              //       onOk() {
              //         handleDelete(col.title, record.key, record.title, col.value)
              //       },
              //       onCancel() {},
              //     });
              //   } else {
              //     confirm({
              //       title: 'Do you want to select this slot?',
              //       icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
              //       //content: <div><DeleteFilled /></div>,
              //       onOk() {
              //         getDayandDate(col.value, record.slot)
              //         //handleAdd(col.title, record.key, record.slot, col.value)
              //         setRecord(prevState => ({
              //           ...prevState,
              //           day: col.title,
              //           key: record.key
              //         }))
              //       },
              //       onCancel() {},
              //     });
              //   }
              //   console.log('This is my obj', obj)
              //   //setVisible(true)
              //   }
            }),
        };
    });
    
    var options = { month: 'long'};
    return (
        <section id="main-content">
        <div className="container-fluid">
          <div className="calendar-page">
              <div className="DateT">
                <button type="button" class="ant-btn previousBtn" onClick={prevWeek}><span>Previous</span></button>
                <button type="button" class="ant-btn nextBtn" onClick={nextWeek}><span>Next</span></button>
                <h4 className="float-right my-3">{new Intl.DateTimeFormat('en-US', options).format(iDate)} {iDate.getFullYear()}</h4>        
            </div>
            {loading ?
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
              {/* <div className="btn-row"> <Button className="float-right primary-btn" onClick={showConfirm}>Save</Button></div> */}
          </div>
        </div>
        </section>
    )
}

export default Scheduler;