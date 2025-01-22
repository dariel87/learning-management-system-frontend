import IonIcon from '@reacticons/ionicons'
import React from 'react'

export default function Sidebar() {
    return (
        <div className='h-screen mt-3'>
            <h4 className='text-center mb-4'>LMS</h4>
            <ul className="list-unstyled ps-1" id="sidebar-menu">
                <li>
                    <a href="" className="d-flex align-items-start p-2">
                        <IonIcon name="apps-outline" className="me-2" />
                        <span>Dashboard</span>
                    </a>
                </li>
                <li><a href="" className="d-flex align-items-start p-2">
                    <IonIcon name="file-tray-stacked-outline" className="me-2" />
                    Master Data</a>
                </li>
                <li><a href="" className="d-flex align-items-start p-2">
                    <IonIcon name="log-out-outline" className="me-2" />
                    Logout</a>
                </li>
            </ul>
        </div>
    )
}
