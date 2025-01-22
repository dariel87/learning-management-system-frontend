import React from 'react'
import Sidebar from '../sidebar'
import Navbar from '../navbar'

export default function DashboardLayout({ children }: any) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-lg-2" id="sidebar">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-lg-10">
                    <Navbar />
                    { children }
                </div>
            </div>
        </div>
    )
}
