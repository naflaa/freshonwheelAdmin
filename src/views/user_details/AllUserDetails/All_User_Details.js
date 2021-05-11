  
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SuccessAlert from 'src/views/SuccessAlert';
import ErrorAlert from 'src/views/ErrorAlert';

import Pagination from "react-js-pagination";


import {
    CCardBody,
    CNavbar,
    CForm,
    CInput,
    CButton,
    } from '@coreui/react'


  
  
export default class All_User_Details extends Component {


    constructor() {
        super();
        this.state = {
            categories: [],
            activePage:1,
          itemsCountPerPage:1,
          totalItemsCount:1,
          pageRangeDisplayed:3,     
          alert_message: ''
          
          
        }
        this.handlePageChange=this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/category')
            .then(response => {
                this.setState({
                    categories: response.data.data,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total,
                    activePage:response.data.current_page
                });
            });

    }

    onDelete(category_id){
        axios.delete('http://127.0.0.1:8000/api/category/delete/'+category_id)
        .then(response=>{
            //to not show deleted item in the table
            var categories = this.state.categories;
            for (var i=0;i<categories.length;i++){
                if(categories[i].id==category_id)
                {
                    categories.splice(i,1);
                    this.setState({categories:categories});
                }
            }
            this.setState({alert_message:'success'})


        }).catch(error=>{
            this.setState({alert_message:'error'})
            
        })
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //this.setState({activePage: pageNumber});
        axios.get('http://127.0.0.1:8000/api/category?page='+pageNumber)
        .then(response => {
            this.setState({
                //per_page,current_page, total and data from laravel api(can see in postman)
                
                categories: response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page


            });
        });


      }
     
    render() {
        return (
            <div>

                <hr/>
                {this.state.alert_message == "success" ? <SuccessAlert message={"Category deleted successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occured while deleting the category."} /> : null}



        <CCardBody>
          <CNavbar light color="light">
            <CForm inline>
              <CInput
                className="mr-sm-2"
                placeholder="Search"
                size="sm"
              />
              <CButton color="outline-success" className="my-2 my-sm-0" type="submit">Search</CButton>
            </CForm>
          </CNavbar>
        </CCardBody>
    

                <table className="table">
                    <thead>
                        <tr>
            
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map(category => {
                                return (
                                    <tr key={category.id}>
                                        <th scope="row">{category.id}</th>

                                        <td>{category.category_name}</td>
                                        <td>{category.category_status==1?("Active"):("Inactive")}</td>
                                        <td>{category.created_at}</td>
                                        <td>{category.updated_at}</td>
                                        
                                        <td><a href='#' onClick={this.onDelete.bind(this,category.id)}>Delete</a></td>
                                        <td>
                                            {/* <Link to={'/categories/edit_category/'+this.props.id} >Edit </Link> */}
                                            <Link to={`/categories/edit_category/${category.id}`}>Edit</Link> 
                                        </td>
                                        
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div  className="d-flex justify-content-center">
        <Pagination 
    
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.totalItemsCount}
          pageRangeDisplayed={this.state.pageRangeDisplayed}
          onChange={this.handlePageChange.bind(this)}
          itemClass='page-item'
          linkClass = 'page-link'
        />
      </div>

               
            </div>
        );
    }
}