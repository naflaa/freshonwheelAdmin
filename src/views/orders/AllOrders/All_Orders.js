import React, { useEffect, useState, useMemo } from 'react'
import { Container } from 'reactstrap'
import TableContainer from 'src/views/TableContainer'
import {BsToggleOff,BsToggleOn} from 'react-icons/bs'
import {FcExpand,FcCollapse} from 'react-icons/fc'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import { Link } from 'react-router-dom';



import 'react-confirm-alert/src/react-confirm-alert.css'; 
import {TiCancel,TiEdit} from 'react-icons/ti'

import 'bootstrap/dist/css/bootstrap.min.css';
import {

  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import {
  CBadge,
  
} from '@coreui/react'

import { SelectColumnFilter } from 'src/views/filters';
import { render } from 'enzyme/build'


const getBadge = sstatus => {
  switch (sstatus) {
    case 'In Cart': return 'dark'
    case 'Pending': return 'warning'
    case 'Completed': return 'success'
    case 'Delivered':return 'secondary'
    case 'Shipped': return 'primary'
    case 'Cancelled': return 'danger'
    case 'Refunded': return 'info'
    case 'Paid' : return 'success'
    case 'Unpaid': return 'danger'
    default: return 'primary'
  }
}

const All_Orders = () => {
  
  
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  
  const [paymentstatus, setPaymentStatus] = useState('');
  
  const orderstatusfilter=(e)=>{
    
  // const ss=e.target.value;
  //   setStatus(ss);
  // console.log(status);
  
  }

 //console.log(status);
 //const statusref = React.createRef();

  useEffect(() => 
  {
  
    const doFetch = async () => {      
    
    
   
// if(!status)
// {
//   const response = await fetch('http://127.0.0.1:8000/api/order/'+status+'/'+paymentstatus);
   
// }
let url='';
if(status!='' & paymentstatus=='')
      url = 'http://127.0.0.1:8000/api/order/orderstatus'+'/'+status;
   else if(paymentstatus!='' & status=='')
   url = 'http://127.0.0.1:8000/api/order/paidstatus'+'/'+paymentstatus;
   else if(status=='' && paymentstatus==''){
   url ='http://127.0.0.1:8000/api/order';
   
   setStatus('');
   setPaymentStatus(''); 
  }
   else 
   url = 'http://127.0.0.1:8000/api/order/both/'+status+'/'+paymentstatus;
   

   
  const response = await fetch(url);
   
console.log(response);
    console.log('url ',status+paymentstatus);
    const body = await response.json();   
    //console.log(body);
    const data = body.results;
    //console.log(data);
    if(data!=null){
      setData(data);
      
    }
    
      else
      setData([]);
    };
    doFetch(); 
  }, [status,paymentstatus]);















// const submit2=(category_id)=> 
// {
//   console.log(category_id);
//   confirmAlert({
//       customUI: ({ onClose }) => {
//         return (
//           <div className='react-confirm-alert-body'>
//             <h3>Are you sure you want to enable this category?</h3>
//             <br/>
//             <button onClick={onClose} style={{backgroundColor:'black',color:'white'}}>No</button>
//             &nbsp;&nbsp;<button style={{backgroundColor:'black',color:'white'}}
//               onClick={() => {
//                 onClickDisable(category_id);
//                 onClose();
//               }}>Yes </button>
//           </div>
//         );
//       }
//     });
// };

//   const submit=(category_id)=>
//   {
//     confirmAlert({
//       customUI: ({ onClose }) => {
//         return (
//           <div className='react-confirm-alert-body'>
//             <h3>Are you sure you want to disable this category?</h3>
//             <br/>
//             <button onClick={onClose} style={{backgroundColor:'black',color:'white'}}>No</button>
//             &nbsp;&nbsp;<button style={{backgroundColor:'black',color:'white'}}
//               onClick={() => {
//                 onClickDisable(category_id);
//                 onClose();
//               }}>Yes </button>
//           </div>
//         );
//       }
//     });
//   };
  


// const onClickDisable=(category_id)=>
// {
// axios.put('http://127.0.0.1:8000/api/order/updatestatus/'+category_id)
//   .then(res => 
//   { 
// //this method is temporary solution for reloading content without refreshing page. if better way found just replace dofetch() with the solution.
//       const doFetch = async () => {
//         const response = await fetch('http://127.0.0.1:8000/api/order');
//         const body = await response.json();
//         const contacts = body.results;
//         console.log(contacts);
//         setData(contacts);
//       };
//       doFetch();
   
//   }).catch(error => {
    
//   })


// };





  const renderRowSubComponent = (row) => {
    const {
      category_status,
     category_name,
      category_image,
      created_at,
      updated_at
    } = row.original;

    return (
      <tr></tr>
    );
  };

  

  const columns = useMemo(
    () => [
      // {

      //   Header: () => null,
      //   id: 'expander', // 'id' is required
      //   Cell: ({ row }) => (
      //     <span {...row.getToggleRowExpandedProps()}>
      //       {row.isExpanded ? <FcCollapse/>: <FcExpand/> }
      //     </span>
      //   ),
      // },
   
      {
                Header: 'id',
                accessor: 'id',
               
                // disableSortBy: true,
              },
              // {
              //   Header: 'category_image',
              //   accessor: 'category_image',
              // },
              {
                Header: 'User Name',
                accessor:'name', 
              },
              {
                Header: 'Order Number',
                accessor:'order_number', 
              },
              // {
              //   Header: 'Order Date',
              //   accessor:'order_date', 
              // },
                // {
              //   Header: 'Order Time',
              //   accessor:'order_time', 
              // },
              // {
              //   Header: 'Offer amount',
              //   accessor:'offer_amt', 
              // },
             
              // {
              //   Header: 'Actual amount',
              //   accessor:'actual_amt', 
              // },
              {
                Header: 'Total',
                accessor:'total_amt', 
                  
                disableFilters:true,
              },
              {
                Header: 'Payment',
                accessor: (values) => {
                      
                      const sstatus= <CBadge size='40em' color={getBadge(values.paid_status)}>
                            {values.paid_status}
                          </CBadge>
                          return sstatus
                      
                },
                // Filter: SelectColumnFilter,
                // filter: 'equals',
                
                disableSortBy: true,  
                disableFilters:true,
              },
              {
                Header: 'Status',
                accessor: (values) => {
                      
                      const sstatus= 
                    <CBadge size='40em' color={getBadge(values.order_status)} value={values.order_status}>
                      {values.order_status}
                    </CBadge>
                    
                      
                        return sstatus;
                        
                        
                        
                },
                // Filter: SelectColumnFilter,
                // filter: 'equals',
                
                disableSortBy: true,  
                disableFilters:true,
              },
              
              // {
        
              //   Header: 'Enable/Disable',
              //   accessor: (values) => {
              //     return values.status==0 ?
              //     <BsToggleOff size='1.5em' color='grey' 
              //     className="addMore" title="Enable Status"
              //     onClick={()=> {submit2(values.id)}}
              //     >

              //     </BsToggleOff> : 
              //     <BsToggleOn size='1.5em' 
              //     className="addMore" title="Disable Status" 
              //   onClick={()=> {submit(values.id)}}
              //   ></BsToggleOn>;
                
              //   } ,  
                
                        // disableSortBy: true,  
                        // disableFilters:true,
                        //                   },
                 {
        
                   Header: 'Edit',
                   accessor: (values) => {                        
                   return <Link to={`/order/edit_order/${values.id}`}><TiEdit className="addMore" title="Edit" color='grey' size='1.5em'/></Link> 
                            } ,  
                                            
                     disableSortBy: true,  
                       disableFilters:true,
                },

                {
        
                  Header: 'View Details',
                  accessor: (values) => {
                                            
                  return <Link to={`/order/view_order_details/${values.id}`}><button>VIEW DETAILS</button></Link> 
           
                  } ,  
                                           
                    disableSortBy: true,  
                      disableFilters:true,
               },
    
    
              ],
    []
    
  );

 

  return (
    
    <Container style={{ marginTop: 50,backgroundColor:'white' }}>
      <br/>
 Payment status <select onChange={(e)=>{setPaymentStatus(e.target.value)}} >
       <option value=''>All</option>
                 <option value="Paid">Paid</option>
               <option value="Unpaid">Unpaid</option>
    
           </select>
           
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

           Order status <select onChange={(e)=>{setStatus(e.target.value)}}>
       <option value=''>All</option>
                 <option value="InCart">In Cart</option>
               <option value="Pending">Pending</option>
               <option value="Completed">Completed</option>
               <option value="Shipped">Shipped</option>
               <option value="Cancelled">Cancelled</option>
               <option value="Refunded">Refunded</option>
           </select>
           <br/>


      <TableContainer style={{ backgroundColor:'white',margin:20 }} columns={columns} data={data}  renderRowSubComponent={renderRowSubComponent} />
    
    </Container>
  );
};

export default All_Orders;




