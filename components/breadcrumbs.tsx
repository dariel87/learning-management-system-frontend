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
        <>
            <h4 className="mt-3">{title}</h4>
            <ol className="mb-3 breadcrumb">
                {links.length > 0 && links.map( link => 
                    link.url === '#' ? 
                    <li key={link.text} className="breadcrumb-item">{link.text}</li>
                    :
                    <li key={link.text} className="breadcrumb-item"><Link href={link.url}>{link.text}</Link></li>
                )}
            </ol>
        </>
    )
}
