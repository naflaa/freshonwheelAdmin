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


export default class Add_New_Offer extends Component {

    constructor() {
        super();
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        
        this.onChangeCategoryImage = this.onChangeCategoryImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category_name: '',
            category_image:'',
           alert_message: ''
        }
    }

    onChangeCategoryName(e) {
        this.setState({
            category_name: e.target.value
        });
    }

    onChangeCategoryImage(e) {
      this.setState({
          category_image: e.target.value
      });
  }

    onSubmit(e) {
        e.preventDefault();
        const category = {
            category_name: this.state.category_name,
            category_image: this.state.category_image
        }

        axios.post('http://127.0.0.1:8000/api/category/store', category)
            .then(res => 
            { 
               this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })
            this.setState({
              category_image:'',
              category_name:''
            })
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
                {this.state.alert_message == "success" ? <SuccessAlert message={"Category added successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occured while adding the category."} /> : null}

                <form onSubmit={this.onSubmit}>
                <div class="form-group">
<CCol xs="12" sm="6">
        <CCard>
        <CCardHeader>
        Add new product Category
           
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
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CLabel htmlFor="name">Category</CLabel>
                  <CInput  id="category_image"
                            value={this.state.category_image}
                            onChange={this.onChangeCategoryImage} 
                            placeholder="Enter category image" required />
                </CFormGroup>
              </CCol>
            </CRow>


{/*      CODE FOR FILE UPLAOD      
            <CRow>
             
              <CCol xs="4">
                <CFormGroup>
                <label for="exampleFormControlFile1">Category Image</label>
  <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                  </CFormGroup>
                  
              </CCol>
             
            </CRow> */}
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




















