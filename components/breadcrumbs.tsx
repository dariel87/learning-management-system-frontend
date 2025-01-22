import Link from 'next/link';
import React from 'react'

interface LinkStructure {
    url: string,
    text: string
}

interface HomeProps {
    links: LinkStructure[];
}

export default function Breadcrumbs({links}: HomeProps) {
    return (
        <ol className="mt-4 mb-3 breadcrumb">
            {links.length > 0 && links.map( link => 
                link.url === '#' ? 
                <li key={link.text} className="breadcrumb-item">{link.text}</li>
                :
                <li key={link.text} className="breadcrumb-item"><Link href={link.url}>{link.text}</Link></li>
            )}
        </ol>
    )
}
