import React, { Fragment } from 'react'
import Link from 'next/link'
import { parse } from 'node-html-parser';

const BreadcrumbList = (props: any) => {

    return (
        <div className="bg-gray-100">
            <div className="breadcrumb py-4 text-black width leading-snug">
                <Link href="/">
                    <a>
                        Home
                    </a>
                </Link>
                <span> / </span>
                {
                    props.breadcrumbs.map((breadcrumb: any, index: any) => {
                        let doc: any = parse(breadcrumb);
                        let hrefAttr = doc.firstChild.rawAttributes != undefined ? doc.firstChild.rawAttributes.href : null
                        return (
                            <Fragment key= {index}>
                                {
                                    hrefAttr == null ? <span dangerouslySetInnerHTML={{ __html: breadcrumb }}></span> :
                                        <Link href={'/' + hrefAttr}><a>{doc.firstChild.text}</a></Link>
                                }
                                
                                {
                                    props.breadcrumbs.length > index+1 && <span> / </span>
                                }
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BreadcrumbList