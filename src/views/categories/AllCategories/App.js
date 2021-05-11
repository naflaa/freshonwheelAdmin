import React, { useEffect, useState, useMemo } from 'react'
import { Container } from 'reactstrap'
import TableContainer from 'src/views/TableContainer'
import {BsToggleOff,BsToggleOn} from 'react-icons/bs'
import {FcExpand,FcCollapse} from 'react-icons/fc'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'

import { Link } from 'react-router-dom';
import {TiCancel,TiEdit} from 'react-icons/ti';



//import 'react-confirm-alert/src/react-confirm-alert.css'; 
//import {TiCancel,TiEdit} from 'react-icons/ti'

import 'bootstrap/dist/css/bootstrap.min.css';
import {

  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';


import { SelectColumnFilter } from 'src/views/filters';


const App = () => {
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const doFetch = async () => {
      //const response = await fetch('https://randomuser.me/api/?results=100');
      const response = await fetch('http://127.0.0.1:8000/api/categorytrial2');
      const body = await response.json();
      const data = body.results;
      console.log(data);
      setData(data);
      
    };
    doFetch();
  }, []);


const submit2=(category_id)=> 
{
  console.log(category_id);
  confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='react-confirm-alert-body'>
            <h3>Are you sure you want to enable this category?</h3>
            <br/>
            <button onClick={onClose} style={{backgroundColor:'black',color:'white'}}>No</button>
            &nbsp;&nbsp;<button style={{backgroundColor:'black',color:'white'}}
              onClick={() => {
                onClickDisable(category_id);
                onClose();
              }}>Yes </button>
          </div>
        );
      }
    });
};

  const submit=(category_id)=>
  {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='react-confirm-alert-body'>
            <h3>Are you sure you want to disable this category?</h3>
            <br/>
            <button onClick={onClose} style={{backgroundColor:'black',color:'white'}}>No</button>
            &nbsp;&nbsp;<button style={{backgroundColor:'black',color:'white'}}
              onClick={() => {
                onClickDisable(category_id);
                onClose();
              }}>Yes </button>
          </div>
        );
      }
    });
  };
  


const onClickDisable=(category_id)=>
{
axios.put('http://127.0.0.1:8000/api/category/updatestatus/'+category_id)
  .then(res => 
  { 
//this method is temporary solution for reloading content without refreshing page. if better way found just replace dofetch() with the solution.
      const doFetch = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/categorytrial2');
        const body = await response.json();
        const contacts = body.results;
        console.log(contacts);
        setData(contacts);
      };
      doFetch();
   
  }).catch(error => {
    
  })


};


  const renderRowSubComponent = (row) => {
    const {
      category_status,
     category_name,
      category_image,
      created_at,
      updated_at
    } = row.original;
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardImg top src={'http://127.0.0.1:8000/img/'+`${category_image}`}  alt='Card image cap' />
        <CardBody>
          <CardTitle>
            <strong>{`${category_name}`} </strong>
          </CardTitle>
          <CardText>
            <strong>category_status</strong>: {category_status} <br />
            <strong>created at:</strong>
            <br/>{created_at}<br/>
            <strong>updated at:</strong>
              <br/>{updated_at}
          </CardText>
        </CardBody>
       
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {

        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <FcCollapse/>: <FcExpand/> }
          </span>
        ),
      },
   
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
                Header: 'category_name',
                accessor: 'category_name',
              },
             
              {
                Header: 'category_status',
                accessor: (values) => {
                  const category_status = values.category_status==1?'Active':'Inactive';
                  return category_status
                },
                Filter: SelectColumnFilter,
                filter: 'equals',
              },
              {
        
                Header: 'Action',
                accessor: (values) => {
                  return values.category_status==0 ?
                  <BsToggleOff size='1.5em' color='grey' 
                  className="addMore" title="Enable Status"
                  onClick={()=> {submit2(values.id)}}
                  >

                  </BsToggleOff> : 
                  <BsToggleOn size='1.5em' 
                  className="addMore" title="Disable Status" 
                onClick={()=> {submit(values.id)}}
                ></BsToggleOn>;
                
                } ,  
                
                        disableSortBy: true,  
                        disableFilters:true,
                                          },

                                          {
        
                                            Header: 'Edit',
                                            accessor: (values) => {
                                             
                                               return <Link to={`/categories/edit_category/${values.id}`}><TiEdit className="addMore" title="Edit" color='grey' size='1.5em'/></Link> 
            
                                            } ,  
                                            
                                                    disableSortBy: true,  
                                                    disableFilters:true,
                                                                      },


             
                // we can also write code below as a separate React Component
              
        
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100,backgroundColor:'white' }}>
 
      <TableContainer style={{ backgroundColor:'white',marginTop:2 }} columns={columns} data={data}  renderRowSubComponent={renderRowSubComponent} />
    </Container>
  );
};

export default App;

