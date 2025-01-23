import Link from 'next/link';
import React from 'react'

interface LinkStructure {
    url: string,
    text: string
}

interface HomeProps {
    title: string,
    links: LinkStructure[];
}

export default function Breadcrumbs({title, links}: HomeProps) {
    return (
        <div className="border-bottom mb-3 bg-white p-3" id="breadcrumb">
            {/* <h4>{title}</h4> */}
            <ol className="breadcrumb m-0">
                {links.length > 0 && links.map( link => 
                    link.url === '#' ? 
                    <li key={link.text} className="breadcrumb-item">{link.text}</li>
                    :
                    <li key={link.text} className="breadcrumb-item"><Link href={link.url}>{link.text}</Link></li>
                )}
            </ol>
        </div>
    )
}
