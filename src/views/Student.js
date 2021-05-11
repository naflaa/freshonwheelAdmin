
import React, {Component} from 'react';
import axios from 'axios'
import { css } from '@emotion/css'
import ClipLoader from 'react-spinners/ClipLoader';

import { Link } from 'react-router-dom';
import {AiOutlineSortAscending} from 'react-icons/ai';
import { IconButton } from '@material-ui/core';
import {AiOutlineSortDescending} from 'react-icons/ai';
import {TiCancel,TiEdit} from 'react-icons/ti'

//import constant from '../constant';
const override = css`
    
    display: block;
    margin: 0 auto;
    border-color: red;


    .table
    {
        mar
    }
    .addMore{
        border: none;
        width: 32px;
        height: 32px;
        background-color: #eee;
        transition: all ease-in-out 0.2s;
        cursor: pointer;
      }
      .addMore:hover{
        border: 1px solid #888;
        background-color: #ddd;
      }
      <butto

`;



class Student extends Component {

    constructor(prop){
        super(prop);
        this.state = {
            students: [],
            from :'',
            per_page :'',
            last_page:'',
            current_page:'',
            next_page_url:'',
            first_page_url:'',
            last_page_url:'',
            prev_page_url:'',
            searchQuery:'',
            test_type:'',
            created_at:'',
            sortColumn:'',
            sortOrder:'',
            loading:true,
            searchBy:'name',
            currentButton: null 

        };

        

        this.pagination = this.pagination.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.handleSelect = this.handleSelect.bind(this);
        this.sortTable = this.sortTable.bind(this);

        this.onButtonClicked = this.onButtonClicked.bind(this)
    }

    onButtonClicked (id) {
        this.setState({ currentButton: this.state.currentButton === id ? null : id })
      }
    componentWillReceiveProps(nextProps, nextState){
        console.log(nextProps, nextState);

    }
    componentWillMount() {
    }
    componentWillUnmount() {
    }
    componentDidMount(){

        // let url = '/api/tests?type='+this.props.match.params.test;
        let url = 'http://127.0.0.1:8000/api/student';
        this.getCallApi(url)
    }

    getCallApi(url){

        axios.get(url)
            .then(json => {

            let response = json.data;
        let data = response.data;

        this.setState({
            students: data,
            from:response.from,
            per_page:response.per_page,
            last_page:response.last_page,
            current_page:response.current_page,
            next_page_url:response.next_page_url,
            first_page_url:response.first_page_url,
            last_page_url:response.last_page_url,
            prev_page_url:response.prev_page_url,
            path:response.path,
            loading: false
        });

    });
    }
    

    pagination(target,e,i=null){
        e.preventDefault();
        this.setState({
            loading: true
        });
        let url;
        switch(target){
            case 'pre':
                if(this.state.prev_page_url != null){
                    this.getCallApi(this.state.prev_page_url);
                }
                break;
            case 'next':
                if(this.state.next_page_url != null){
                    this.getCallApi(this.state.next_page_url);
                }
                break;
            case 'btn-click':
                url = this.state.path+'?page='+i;

                this.getCallApi(url);

                break;
            case 'test_type':

                let val = e.target.value=='All'?'':e.target.value;
                this.setState({
                    test_type : val
                });
                let searchQuery = this.state.searchQuery !==undefined ? this.state.searchQuery : '';

                if(e.target.value != null){
                    let url = 'http://127.0.0.1:8000/api/student?searchColumn='+this.state.searchBy+'&searchQuery='+searchQuery+'&test_type='+val;
                    this.getCallApi(url);
                }
                break;

                
        }
        this.setState({
            loading: false
        });
    }

    sortTable(key,order,e){
        e.preventDefault();
        this.state.sortColumn = key;
        
        //this.state.sortOrder = this.state.sortOrder=='' || this.state.sortOrder=='asc'?'desc':'asc';
        
        if(order=='asc')
        this.state.sortOrder='asc'
        
        else if(order=='desc')
        this.state.sortOrder='desc'
        let url = 'http://127.0.0.1:8000/api/student?searchColumn='+this.state.searchBy+'&searchQuery='+this.state.searchQuery+'&test_type='+this.state.test_type
            +'&sortColumn='+this.state.sortColumn+'&sortOrder='+this.state.sortOrder;
        this.getCallApi(url);
    }

          


         
        //  //  {/* ----------------1 icon interchanging when clicked. --------------------- */}
//  sortTable(key,e){
//     e.preventDefault();
//     this.state.sortColumn = key;
//     this.state.sortOrder = this.state.sortOrder=='' || this.state.sortOrder=='asc'?'desc':'asc';
    
//     let url = 'http://127.0.0.1:8000/api/student?searchColumn='+this.state.searchBy+'&searchQuery='+this.state.searchQuery+'&test_type='+this.state.test_type
//         +'&sortColumn='+this.state.sortColumn+'&sortOrder='+this.state.sortOrder;
//     this.getCallApi(url);
// }

    handleSelect(e){
        let val1 = e.target.value=='Search By'?'name':e.target.value;
        this.setState({
            searchBy:val1
            
        })
    }
    handleChange(e){
            this.setState({
                loading: true,
                
            });
            this.setState({
                searchQuery:e.target.value
            });

            
            let test_type = this.state.test_type !==undefined ? this.state.test_type : '';

            let url = 'http://127.0.0.1:8000/api/student?searchColumn='+this.state.searchBy+'&searchQuery='+e.target.value+'&test_type='+test_type;
            this.getCallApi(url);

            this.setState({
                loading: false
            });
        
    }

    render() {
        let table_row;

        if(this.state.students.length>0){
            let tr;
            table_row = this.state.students.map((name, index)=>{

                return <tr key={index}>
                <td>{name.name}</td>

                <td>{name.score} / 100</td>
            {/* <td>{name.test_name}</td>
             */}
            <td>
            {name.type}
            </td>    
            
            <td>{name.created_at}</td>

            
            <td><a href='#'><TiCancel  size='1.5em' color='grey' className="addMore" title="Disable" /></a>&nbsp;&nbsp;&nbsp;&nbsp;
                                       
{/*                                             
            <Link to={`/categories/edit_category/${category.id}`}>  here instead of id need to write this */}
                                      
                                            {/* <Link to={`/categories/edit_category/id`}><TiEdit className="addMore" title="Edit" color='grey' size='1.5em'/></Link>  */}
                                        </td>
                                        
            </tr>;
            

        });
        }else{
            table_row = "NO MATCHING ROWS"
            
        }

        let rows = [];
        for (let i = 1; i <= this.state.last_page; i++) {
            rows.push(<li className="page-item" key={i}><a className="page-link" href="#" onClick={(e)=>this.pagination('btn-click',e,i)}>{i}</a></li>);
        }

        return (

            <div className="page-wrapper">

            <div className="row page-titles">
            <div className="col-md-5 align-self-center">
            <h3 className="text-themecolor">Student</h3>
            </div>

            </div>

            <div className="container-fluid">
            <div className="row">
            <div className="col-lg-12 col-md-12">
            <div className="card card-default">
            <div className="card-header">
            <div className="card-actions">
            <a className="" data-action="collapse"><i className="ti-minus"></i></a>

        </div>
        <h4 className="card-title m-b-0">Student List</h4>
        </div>
        <div className="card-body collapse show">
            <div className="d-flex no-block">
            {/* <h4 className="card-title">Student Report<br/>
        <small className="text-muted">Student test report</small>
        </h4>
   */}
  
  <div>
  <select className="custom-select" onChange={(e)=>this.pagination('test_type',e)} style={{'marginRight':'10px'}}>
    <option defaultValue="">All</option>
            <option value="type1">type1</option>
            <option value="type2">type2</option>
            
            <option value="type3">type3</option>
            
            </select>

  </div>
        <div className="ml-auto" style={{'display':'inherit'}}>
        
            
            <select className="custom-select" onChange={(e)=>{this.handleSelect(e)}} style={{'marginRight':'10px'}}>
            <option defaultValue="name">Search By</option>
            <option value="name">Search By Name</option>
            <option value="type">Search By Type</option>
            <option value="score">Search By Score</option>
            
            <option value="created_at">Search By Created_at</option>
            
            </select>

            <input type="text" name={"search"}
        onChange={(e)=>{this.handleChange(e)}} className="form-control"/>
   
            </div>
            </div>

            <div className="table-responsive">

            {!this.state.loading ?
    <div>
        <br/>

        
        <table className="table product-overview">
            <thead>
            <tr>

                   {/* ----------------1 icon interchanging when clicked. --------------------- */}
        {/* <th  onClick={(e)=>{this.sortTable('name',e)}} >Student Name{this.state.sortColumn=='name'&&this.state.sortOrder=='asc'?<AiOutlineSortAscending/>:<AiOutlineSortDescending/>}</th>
        
        <th  onClick={(e)=>{this.sortTable('score',e)}} >Score{this.state.sortColumn=='score'&&this.state.sortOrder=='asc'?<AiOutlineSortAscending/>:<AiOutlineSortDescending/>}</th>
         */}
            <th>Student Name<IconButton size='small'
          color={this.state.currentButton === 0 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(0)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('name','asc',e)}}/></IconButton> <IconButton size='small'
          color={this.state.currentButton === 1 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(1)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('name','desc',e)}} /></IconButton></th>
        
        
        <th>Score<IconButton size='small'
          color={this.state.currentButton === 2 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(2)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('score','asc',e)}}/></IconButton> <IconButton size='small'
          color={this.state.currentButton === 3 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(3)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('score','desc',e)}} /></IconButton></th>
        
        {/* <th>Test Name<IconButton size='small'
          color={this.state.currentButton === 4 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(4)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('test_name','asc',e)}}/></IconButton><IconButton size='small'
          color={this.state.currentButton === 5 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(5)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('test_name','desc',e)}} /></IconButton></th>
         */}
        <th>Test Type<IconButton size='small'
          color={this.state.currentButton === 6 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(6)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('type','asc',e)}}/></IconButton><IconButton size='small'
          color={this.state.currentButton === 7 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(7)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('type','desc',e)}} /></IconButton></th>
        
        <th>Created at<IconButton size='small'
          color={this.state.currentButton === 8 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(8)}><AiOutlineSortAscending onClick={(e)=>{this.sortTable('created_at','asc',e)}}/></IconButton> <IconButton size='small'
          color={this.state.currentButton === 9 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(9)}><AiOutlineSortDescending onClick={(e)=>{this.sortTable('created_at','desc',e)}} /></IconButton></th>
        <th>Actions</th>
        <th></th>
        
        </tr>
        
        </thead>

        <tbody>

        {table_row}

        </tbody>

        </table>

        <div className="dataTables_paginate paging_simple_numbers" id="example23_paginate">
            <ul className="pagination justify-content-end">
            <li className="page-item"><a className="page-link" href="#" onClick={(e)=>this.pagination('pre',e)}>Previous</a></li>
        {rows}
        <li className="page-item"><a className="page-link" href="#" onClick={(e)=>this.pagination('next',e)}>Next</a></li>
        </ul>
        </div>
        </div>
    :
    <div className='sweet-loading' style={{'textAlign':'center'}}>
    <ClipLoader
     className={override}

        sizeUnit={"px"}
        size={50}
        color={'#123abc'}
        loading={this.state.loading}
        />
        </div>
    }
    </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
    }
}

export default Student