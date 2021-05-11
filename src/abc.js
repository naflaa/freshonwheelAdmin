import React, { Component } from "react";
import DataTable from "./DataTable";


function Abc() {
    return (
        <div className="card">
            <div className="card-header">Users</div>
            <div className="card-body">
                <DataTable
                    fetchUrl="http://127.0.0.1:8000/api/categorytrial"
                    columns={["id", "category_name", "category_image", "category_status"]}
                ></DataTable>
            </div>
        </div>
    );
};

export default Abc;