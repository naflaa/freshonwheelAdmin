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


import { SelectColumnFilter } from 'src/views/filters';


const App = () => {
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const doFetch = async () => {
      //const response = await fetch('https://randomuser.me/api/?results=100');
      const response = await fetch('http://127.0.0.1:8000/api/category');
      const body = await response.json();
      const data = body.results;
      console.log(data);
      if(data!=null)
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
        const response = await fetch('http://127.0.0.1:8000/api/category');
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
    <Container style={{ marginTop: 0,backgroundColor:'white' }}>
 
      <TableContainer style={{ backgroundColor:'white',marginTop:2 }} columns={columns} data={data}  renderRowSubComponent={renderRowSubComponent} />
    </Container>
  );
};

export default App;





// import React, { Component } from 'react';
// import axios from 'axios';

// import SuccessAlert from 'src/views/SuccessAlert';
// import ErrorAlert from 'src/views/ErrorAlert';
// import { confirmAlert } from 'react-confirm-alert';

// import { css } from '@emotion/css'
// import ClipLoader from 'react-spinners/ClipLoader';

// import { Link } from 'react-router-dom';
// import {AiOutlineSortAscending} from 'react-icons/ai';
// import { IconButton } from '@material-ui/core';
// import {AiOutlineSortDescending} from 'react-icons/ai';
// import {TiCancel,TiEdit} from 'react-icons/ti'
// import {BsToggleOff,BsToggleOn} from 'react-icons/bs'


// import 'react-confirm-alert/src/react-confirm-alert.css'; 

// import {
//     CCardBody,
//     CNavbar,
//     CForm,
//     CInput,
//     CButton,
//     } from '@coreui/react'


//     const override = css`
        
//         display: block;
//         margin: 0 auto;
//         border-color: red;
    
    
//         .table
//         {
//             mar
//         }
//         .addMore{
//             border: none;
//             width: 32px;
//             height: 32px;
//             background-color: #eee;
//             transition: all ease-in-out 0.2s;
//             cursor: pointer;
//           }
//           .addMore:hover{
//             border: 1px solid #888;
//             background-color: #ddd;
//           }
//     `;
    
    
//     class All_Categories extends Component {
    
//         constructor(prop){
//             super(prop);
//             this.state = {
//                 categories: [],
//                 from :'',
//                 per_page :'',
//                 last_page:'',
//                 current_page:'',
//                 next_page_url:'',
//                 first_page_url:'',
//                 last_page_url:'',
//                 prev_page_url:'',
//                 searchQuery:'',
//                 category_status:'',
//                 created_at:'',
//                 sortColumn:'',
//                 sortOrder:'',
//                 loading:true,
//                 searchBy:'category_name',
//                 currentButton: null,
//                 alert_message: ''
//             };
    
//             this.pagination = this.pagination.bind(this);
//             this.handleChange = this.handleChange.bind(this);
//             this.handleSelect = this.handleSelect.bind(this);
//             this.sortTable = this.sortTable.bind(this);
//             this.onButtonClicked = this.onButtonClicked.bind(this)
//             this.onClickDisable = this.onClickDisable.bind(this)
//             this.submit=this.submit.bind(this)
//             this.submit2=this.submit2.bind(this)
//         }
    
//         submit(category_id) {
//             console.log(category_id);
//             confirmAlert({
//                 customUI: ({ onClose }) => {
//                   return (
//                     <div className='react-confirm-alert-body'>
//                       <h3>Are you sure you want to disable this category?</h3>
//                       <br/>
//                       <button onClick={onClose} style={{backgroundColor:'black',color:'white'}}>No</button>
//                       &nbsp;&nbsp;<button style={{backgroundColor:'black',color:'white'}}
//                         onClick={() => {
//                           this.onClickDisable(category_id);
//                           onClose();
//                         }}>Yes </button>
//                     </div>
//                   );
//                 }
//               });
//         };
        

//         submit2(category_id) {
//             console.log(category_id);
//             confirmAlert({
//                 customUI: ({ onClose }) => {
//                   return (
//                     <div className='react-confirm-alert-body'>
//                       <h3>Are you sure you want to enable this category?</h3>
//                       <br/>
//                       <button onClick={onClose} style={{backgroundColor:'black',color:'white'}}>No</button>
//                       &nbsp;&nbsp;<button style={{backgroundColor:'black',color:'white'}}
//                         onClick={() => {
//                           this.onClickDisable(category_id);
//                           onClose();
//                         }}>Yes </button>
//                     </div>
//                   );
//                 }
//               });
//         };
        

//         onButtonClicked (id) {
//             this.setState({ currentButton: this.state.currentButton === id ? null : id })
//           }
        
//           componentWillReceiveProps(nextProps, nextState){
//             console.log(nextProps, nextState);
    
//         }
//         componentWillMount() {
//         }
//         componentWillUnmount() {
//         }
//         componentDidMount(){
    
//             let url = 'http://127.0.0.1:8000/api/category';
//             this.getCallApi(url)
//         }
    
//         getCallApi(url){
    
//             axios.get(url)
//                 .then(json => {
    
//                 let response = json.data;
//             let data = response.data;
    
//             this.setState({
//                 categories: data,
//                 from:response.from,
//                 per_page:response.per_page,
//                 last_page:response.last_page,
//                 current_page:response.current_page,
//                 next_page_url:response.next_page_url,
//                 first_page_url:response.first_page_url,
//                 last_page_url:response.last_page_url,
//                 prev_page_url:response.prev_page_url,
//                 path:response.path,
//                 loading: false,
//             });
    
//         });
//         }
        
    
//         pagination(target,e,i=null){
//             e.preventDefault();
//             this.setState({
//                 loading: true
//             });
//             let url;
//             switch(target){
//                 case 'pre':
//                     if(this.state.prev_page_url != null){
//                         this.getCallApi(this.state.prev_page_url);
//                     }
//                     break;
//                 case 'next':
//                     if(this.state.next_page_url != null){
//                         this.getCallApi(this.state.next_page_url);
//                     }
//                     break;
//                 case 'btn-click':
//                     url = this.state.path+'?page='+i;
    
//                     this.getCallApi(url);
    
//                     break;
//                 case 'category_status':
    
//                     let val = e.target.value=='All'?'':e.target.value;
                  
//                     this.setState({
//                         category_status : val
//                     });
//                     let searchQuery = this.state.searchQuery !==undefined ? this.state.searchQuery : '';
    
//                     if(e.target.value != null){
//                         let url = 'http://127.0.0.1:8000/api/category?searchColumn='+this.state.searchBy+'&searchQuery='+searchQuery+'&category_status='+val;
//                         this.getCallApi(url);
//                     }
//                     break;
    
                    
//             }
//             this.setState({
//                 loading: false
//             });
//         }
    
//         sortTable(key,order,e){
//             e.preventDefault();
//             this.state.sortColumn = key;
            
//             //this.state.sortOrder = this.state.sortOrder=='' || this.state.sortOrder=='asc'?'desc':'asc';
            
//             if(order=='asc' )
//             this.state.sortOrder='asc'
            
//             else if(order=='desc' )
//             this.state.sortOrder='desc'
//             let url = 'http://127.0.0.1:8000/api/category?searchColumn='+this.state.searchBy+'&searchQuery='+this.state.searchQuery+'&category_status='+this.state.category_status
//                 +'&sortColumn='+this.state.sortColumn+'&sortOrder='+this.state.sortOrder;
//             this.getCallApi(url);
//         }
    
              
//     onClickDisable(category_id)
//     {
        
//         axios.put('http://127.0.0.1:8000/api/category/updatestatus/'+category_id)
//             .then(res => 
//             { 
//                 let url = 'http://127.0.0.1:8000/api/category';
//                 this.getCallApi(url)
//             }).catch(error => {
//                 this.setState({ alert_message: "error" });
//             })
    
          
//     }
    
             
//             //  //  {/* ----------------1 icon interchanging when clicked. --------------------- */}
//     //  sortTable(key,e){
//     //     e.preventDefault();
//     //     this.state.sortColumn = key;
//     //     this.state.sortOrder = this.state.sortOrder=='' || this.state.sortOrder=='asc'?'desc':'asc';
        
//     //     let url = 'http://127.0.0.1:8000/api/category?searchColumn='+this.state.searchBy+'&searchQuery='+this.state.searchQuery+'category_status='+this.state.status
//     //         +'&sortColumn='+this.state.sortColumn+'&sortOrder='+this.state.sortOrder;
//     //     this.getCallApi(url);
//     // }
    
//         handleSelect(e){
//             let val1 = e.target.value=='Search By'?'category_name':e.target.value;
//             this.setState({
//                 searchBy:val1
//             })
//         }
//         handleChange(e){
//                 this.setState({
//                     loading: true,
                    
//                 });
//                 this.setState({
//                     searchQuery:e.target.value
//                 });
    
                
//                 let status = this.state.category_status !==undefined ? this.state.category_status : '';
    
//                 let url = 'http://127.0.0.1:8000/api/category?searchColumn='+this.state.searchBy+'&searchQuery='+e.target.value+'&category_status='+status;
//                 this.getCallApi(url);
    
//                 this.setState({
//                     loading: false
//                 });
            
//         }
    
//         render() {
//             let table_row;
    
//             if(this.state.categories.length>0){
//                 let tr;
//                 table_row = this.state.categories.map((category, index)=>{
    
//                     return <tr key={index}>
                        
//                     <td>{category.id}</td>
//                     <td>{category.category_name}</td>
    
                 
//                 {/* <td>{name.test_name}</td>
//                  */}
               
//                 <td>
//                 {category.category_image}
//                 </td>    
                

//                 <td>{category.created_at}</td>
    
//                 <td>{category.updated_at}</td>
//                 {/* {category.category_status==1?("Active"):("Inactive")} */}
//                 <td>{category.category_status}  &nbsp;&nbsp;{category.category_status==1?<a href='#'><BsToggleOn  size='1.5em' color='grey' className="addMore" title="Disable Status" onClick={this.submit.bind(this,category.id)} /></a>
//                                      :<a href='#'><BsToggleOff  size='1.5em' color='grey' className="addMore" title="Enable Status" onClick={this.submit2.bind(this,category.id)} /></a>
//                                     }</td>
                
//                 <td>
//     {/*                                             
//                 <Link to={`/categories/edit_category/${category.id}`}>  here instead of id need to write this */}
                                          
//                                         <Link to={`/categories/edit_category/${category.id}`}><TiEdit className="addMore" title="Edit" color='grey' size='1.5em'/></Link> 
//                                             </td>
                                            
//                 </tr>;
                
    
//             });
//             }else{
//                 table_row = "NO MATCHING ROWS"
                
//             }
    
//             let rows = [];
//             for (let i = 1; i <= this.state.last_page; i++) {
//                 rows.push(<li className="page-item" key={i}><a className="page-link" href="#" onClick={(e)=>this.pagination('btn-click',e,i)}>{i}</a></li>);
//             }
    
//             return (
    
//                 <div className="page-wrapper">
    
//                 <div className="row page-titles">
//                 <div className="col-md-5 align-self-center">
//                 <h3 className="text-themecolor">category</h3>
//                 </div>
    
//                 </div>
    
//                 <div className="container-fluid">
//                 <div className="row">
//                 <div className="col-lg-12 col-md-12">
//                 <div className="card card-default">
//                 <div className="card-header">
//                 <div className="card-actions">
//                 <a className="" data-action="collapse"><i className="ti-minus"></i></a>
    
//             </div>
//             <h4 className="card-title m-b-0">category List</h4>
//             </div>
//             <div className="card-body collapse show">
//                 <div className="d-flex no-block">
//                 {/* <h4 className="card-title">category Report<br/>
//             <small className="text-muted">category test report</small>
//             </h4>
//        */}
      
//       <div>
         
//       <select className="custom-select" onChange={(e)=>this.pagination('category_status',e)} style={{'marginRight':'10px'}}>
//         <option defaultValue="">All</option>
//                 <option value="1">Active</option>
//                 <option value="0">Inactive</option>
    
//                 </select>
    
//       </div>
//             <div className="ml-auto" style={{'display':'inherit'}}>
            
                
//                 <select className="custom-select" onChange={(e)=>{this.handleSelect(e)}} style={{'marginRight':'10px'}}>
//                 <option defaultValue="category_name">Search By..</option>
//                 <option value="id">Search By ID</option>
//                 <option value="category_name">Search By Name</option>
               
//                 {/* <option value="type">Search By status</option> */}
//                 <option value="updated_at">Search By updated at</option>
                
//                 <option value="created_at">Search By Created_at</option>
                
//                 </select>
    
//                 <input type="text" name={"search"}
//             onChange={(e)=>{this.handleChange(e)}} className="form-control"/>
       
//                 </div>
//                 </div>
    
//                 <div className="table-responsive">
    
//                 {!this.state.loading ?
//         <div>
//             <br/>
    
//             <hr/>
//                 {this.state.alert_message == "success" ? <SuccessAlert message={"Category deleted successfully."} /> : null}
//                  {this.state.alert_message == "error" ? <ErrorAlert message={"Error occured while deleting the category."} /> : null}


//             <table className="table product-overview">
//                 <thead>
//                 <tr>
    
//                        {/* ----------------1 icon interchanging when clicked. --------------------- */}
//             {/* <th  onClick={(e)=>{this.sortTable('name',e)}} >category Name{this.state.sortColumn=='name'&&this.state.sortOrder=='asc'?<AiOutlineSortAscending/>:<AiOutlineSortDescending/>}</th>
            
//             <th  onClick={(e)=>{this.sortTable('score',e)}} >Score{this.state.sortColumn=='score'&&this.state.sortOrder=='asc'?<AiOutlineSortAscending/>:<AiOutlineSortDescending/>}</th>
//              */}

//         <th>ID<IconButton size='small'
//               color={this.state.currentButton === 10 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(10)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('id','asc',e)}}/></IconButton> <IconButton size='small'
//               color={this.state.currentButton === 11 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(11)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('id','desc',e)}} /></IconButton></th>
            

//                 <th>Category<IconButton size='small'
//               color={this.state.currentButton === 0 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(0)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('category_name','asc',e)}}/></IconButton> <IconButton size='small'
//               color={this.state.currentButton === 1 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(1)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('category_name','desc',e)}} /></IconButton></th>
            
            
//             {/* <th>Test Name<IconButton size='small'
//               color={this.state.currentButton === 4 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(4)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('test_name','asc',e)}}/></IconButton><IconButton size='small'
//               color={this.state.currentButton === 5 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(5)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('test_name','desc',e)}} /></IconButton></th>
//              */}
//             <th>Image<IconButton size='small'
//               color={this.state.currentButton === 6 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(6)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('category_image','asc',e)}}/></IconButton><IconButton size='small'
//               color={this.state.currentButton === 7 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(7)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('category_image','desc',e)}} /></IconButton></th>
            
//             <th>Created at<IconButton size='small'
//               color={this.state.currentButton === 8 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(8)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('created_at','asc',e)}}/></IconButton> <IconButton size='small'
//               color={this.state.currentButton === 9 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(9)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('created_at','desc',e)}} /></IconButton></th>
           
//            <th>Updated at<IconButton size='small'
//               color={this.state.currentButton === 12 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(12)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('updated_at','asc',e)}}/></IconButton> <IconButton size='small'
//               color={this.state.currentButton === 13 ? "primary" : "default" }
//               onClick={() => this.onButtonClicked(13)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('updated_at','desc',e)}} /></IconButton></th>
           
           
           
            
//            <th>Status</th>
//             <th>Actions</th>
//             <th></th>
            
//             </tr>
            
//             </thead>
    
//             <tbody>
    
//             {table_row}
    
//             </tbody>
    
//             </table>
    
//             <div className="dataTables_paginate paging_simple_numbers" id="example23_paginate">
//                 <ul className="pagination justify-content-end">
//                 <li className="page-item"><a className="page-link" href="#" onClick={(e)=>this.pagination('pre',e)}>Previous</a></li>
//             {rows}
//             <li className="page-item"><a className="page-link" href="#" onClick={(e)=>this.pagination('next',e)}>Next</a></li>
//             </ul>
//             </div>
//             </div>
//         :
//         <div className='sweet-loading' style={{'textAlign':'center'}}>
//         <ClipLoader
//          className={override}
    
//             sizeUnit={"px"}
//             size={50}
//             color={'#123abc'}
//             loading={this.state.loading}
//             />
//             </div>
//         }
//         </div>
//             </div>
//             </div>
//             </div>
//             </div>
//             </div>
//             </div>
//         );
//         }
//     }
    
//     export default All_Categories



  
  
// // export default class All_Categories extends Component {


// //     constructor() {
// //         super();
// //         this.state = {
// //             categories: [],
// //             activePage:1,
// //           itemsCountPerPage:1,
// //           totalItemsCount:1,
// //           pageRangeDisplayed:3,     
// //           alert_message: ''
          
          
// //         }
// //         this.handlePageChange=this.handlePageChange.bind(this);
// //     }

// //     componentDidMount() {
// //         axios.get('http://127.0.0.1:8000/api/category')
// //             .then(response => {
// //                 this.setState({
// //                     categories: response.data.data,
// //                     itemsCountPerPage:response.data.per_page,
// //                     totalItemsCount:response.data.total,
// //                     activePage:response.data.current_page
// //                 });
// //             });

// //     }

// //     onDelete(category_id){
// //         axios.delete('http://127.0.0.1:8000/api/category/delete/'+category_id)
// //         .then(response=>{
// //             //to not show deleted item in the table
// //             var categories = this.state.categories;
// //             for (var i=0;i<categories.length;i++){
// //                 if(categories[i].id==category_id)
// //                 {
// //                     categories.splice(i,1);
// //                     this.setState({categories:categories});
// //                 }
// //             }
// //             this.setState({alert_message:'success'})


// //         }).catch(error=>{
// //             this.setState({alert_message:'error'})
            
// //         })
// //     }

// //     handlePageChange(pageNumber) {
// //         console.log(`active page is ${pageNumber}`);
// //         //this.setState({activePage: pageNumber});
// //         axios.get('http://127.0.0.1:8000/api/category?page='+pageNumber)
// //         .then(response => {
// //             this.setState({
// //                 //per_page,current_page, total and data from laravel api(can see in postman)
                
// //                 categories: response.data.data,
// //                 itemsCountPerPage:response.data.per_page,
// //                 totalItemsCount:response.data.total,
// //                 activePage:response.data.current_page


// //             });
// //         });


// //       }
     
// //     render() {
// //         return (
// //             <div>

// //                 <hr/>
// //                 {this.state.alert_message == "success" ? <SuccessAlert message={"Category deleted successfully."} /> : null}
// //                 {this.state.alert_message == "error" ? <ErrorAlert message={"Error occured while deleting the category."} /> : null}



// //         <CCardBody>
// //           <CNavbar light color="light">
// //             <CForm inline>
// //               <CInput
// //                 className="mr-sm-2"
// //                 placeholder="Search"
// //                 size="sm"
// //               />
// //               <CButton color="outline-success" className="my-2 my-sm-0" type="submit">Search</CButton>
// //             </CForm>
// //           </CNavbar>
// //         </CCardBody>
    

// //                 <table className="table">
// //                     <thead>
// //                         <tr>
            
// //                         </tr>
// //                         <tr>
// //                             <th scope="col">#</th>
// //                             <th scope="col">Category Name</th>
// //                             <th scope="col">Status</th>
// //                             <th scope="col">Created At</th>
// //                             <th scope="col">Updated At</th>
// //                             <th scope="col">Action</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {
// //                             this.state.categories.map(category => {
// //                                 return (
// //                                     <tr key={category.id}>
// //                                         <th scope="row">{category.id}</th>

// //                                         <td>{category.category_name}</td>
// //                                         <td>{category.category_status==1?("Active"):("Inactive")}</td>
// //                                         <td>{category.created_at}</td>
// //                                         <td>{category.updated_at}</td>
                                        
// //                                         <td><a href='#' onClick={this.onDelete.bind(this,category.id)}>Delete</a></td>
// //                                         <td>
// //                                             {/* <Link to={'/categories/edit_category/'+this.props.id} >Edit </Link> */}
// //                                             <Link to={`/categories/edit_category/${category.id}`}>Edit</Link> 
// //                                         </td>
                                        
// //                                     </tr>
// //                                 )
// //                             })
// //                         }
// //                     </tbody>
// //                 </table>
// //                 <div  className="d-flex justify-content-center">
// //         <Pagination 
    
// //           activePage={this.state.activePage}
// //           itemsCountPerPage={this.state.itemsCountPerPage}
// //           totalItemsCount={this.state.totalItemsCount}
// //           pageRangeDisplayed={this.state.pageRangeDisplayed}
// //           onChange={this.handlePageChange.bind(this)}
// //           itemClass='page-item'
// //           linkClass = 'page-link'
// //         />
// //       </div>

               
// //             </div>
// //         );
// //     }
// // }