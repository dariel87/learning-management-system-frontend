import React from 'react'
import Sidebar from '../sidebar'
import Navbar from '../navbar'

export default function DashboardLayout({ children }: any) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="card mt-5">
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
