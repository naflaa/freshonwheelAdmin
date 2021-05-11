import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from 'src/views/SuccessAlert';
import ErrorAlert from 'src/views/ErrorAlert';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import { useParams } from 'react-router';


export default class Edit_Category extends Component {
  

    constructor(props) {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        
        this.onChangeCategoryImage = this.onChangeCategoryImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category_name: '',
            category_image:'',
           alert_message: ''
        }
    }
//TO POPULATE TEXT INPUTS WITH VALUES FROM DATABASE
   

        componentDidMount() {
          axios.get('http://127.0.0.1:8000/api/category/edit/'+this.props.match.params.id)
              .then(response => {
                console.log(this.props);

                  this.setState({ category_name: response.data.category_name });
                  
                  this.setState({ category_image: response.data.category_image });
              });
      }

    onChangeCategoryName(e) {
        this.setState({
            category_name: e.target.value
        });
        
    }

    onChangeCategoryImage(file) {
      let image=file[0];
      this.setState({
        category_image: file[0]

    });

    
    if (!image.name.match(/\.(jpg|jpeg|png|jfif)$/)) {
      this.setState({ invalid_image: 'Please select valid image. Only jpg, jpeg, png and jfif formats are allowed.' });
      return false;
    }

this.setState({invalid_image:null});
return false;
   
    }
  
   
  

    onSubmit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append('image', this.state.category_image);
        
        fd.append('category_name', this.state.category_name);

        
        console.log(fd);
      //   const category = {
      //     category_name: this.state.category_name,
      //     category_image: this.state.category_image
      // }

        
        console.log(this.state.category_image);

        axios.post('http://127.0.0.1:8000/api/category/update/'+this.props.match.params.id, fd)
            .then(res => 
            { 
               this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
                //this.myFormRef.reset();
            })
    
            // this.setState({
            //   category_image:'',
            //   category_name:''
            // })
          }

          onReset(e) {
            e.preventDefault();
          this.setState(
            {
              category_name:'',
              category_image:''
            }
          );
          }
    render() {
        return (
            <div>
                <hr />
                
                {this.state.alert_message == "success" ? <SuccessAlert message={"Category updated successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occured while updating the category."} /> : null}

                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                <div class="form-group">
<CCol xs="12" sm="6">
        <CCard>
        <CCardHeader>
        Edit product Category
           
          </CCardHeader>
          <CCardBody>
          
       
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CLabel htmlFor="name">Category</CLabel>
                  <CInput  id="category_name"
                            value={this.state.category_name}
                            onChange={this.onChangeCategoryName} 
                            placeholder="Enter category name" required />
                </CFormGroup>
              </CCol>
            </CRow>

{/* 
 TEMPORARY CODE FOR IMAGE */}
            {/* <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CLabel htmlFor="name">Category</CLabel>
                  <CInput  id="category_image"
                            value={this.state.category_image}
                            onChange={this.onChangeCategoryImage} 
                            placeholder="Enter category image" required />
                </CFormGroup>
              </CCol>
            </CRow> */}


{/*      CODE FOR FILE UPLAOD         */}
            <CRow>
             
              <CCol xs="4">
                <CFormGroup>
                <label for="category_image">Category Image</label>
  <input type="file" name='file' class="form-control-file" id="image" style={{width:'100em'}} 
                            onChange={(e)=>this.onChangeCategoryImage(e.target.files)} />
                                  <p style={{color:"red",width:"500px"}}>{this.state.invalid_image}</p>
           
                  </CFormGroup>
                  
              </CCol>
             
            </CRow>
          
            <div className="form-actions">
                    <CButton type="submit" color="primary">Save changes</CButton><span> </span>
                    <CButton color="secondary" onClick={this.onReset.bind(this)}>Cancel</CButton>
                  </div>
          </CCardBody>
        </CCard>
      </CCol>
</div>
                </form>
            </div>
        );
    }
}




















