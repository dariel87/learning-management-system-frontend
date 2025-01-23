import IonIcon from '@reacticons/ionicons'
import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
    return (
        <div className='h-screen pt-3'>
            <h4 className='mb-4'>Free LMS</h4>
            <ul className="list-unstyled ps-1" id="sidebar-menu">
                <li>
                    <a href="" className="d-flex align-items-start p-2">
                        <IonIcon name="apps-outline" className="me-2" />
                        <span>Dashboard</span>
                    </a>
                </li>
                <li><Link href="/subjects" className="d-flex align-items-start p-2">
                    <IonIcon name="book-outline" className="me-2" />
                    Subject</Link>
                </li>
                <li><Link href="/academic_years" className="d-flex align-items-start p-2">
                    <IonIcon name="calendar-outline" className="me-2" />
                    Academic Year</Link>
                </li>
                <li><Link href="/users" className="d-flex align-items-start p-2">
                    <IonIcon name="people-outline" className="me-2" />
                    User Management</Link>
                </li>
                <li><a href="" className="d-flex align-items-start p-2">
                    <IonIcon name="log-out-outline" className="me-2" />
                    Logout</a>
                </li>
            </ul>
        </div>
    )
}
