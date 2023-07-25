import React, { useContext, useState } from 'react'
import { MainContext } from '../../contexts/MainContext'

const Pagination = (props: any) => {

    const {redirectTo, setIsLoading} = useContext(MainContext)
    const [counts, setcounts] = useState(props.num)
    const [current, setcurrent] = useState(props.current!=undefined ? props.current : 1)
    const [start, setstart] = useState(1)
    const [end, setend] = useState(5)

    // let paging = {
    //     counts : props.num,
    //     current : props.current!=undefined ? props.current : 1,
    //     start: 1,
    //     end: 5
    // }

    const range = (start: number, end: number, step = 1) => {
        let output = [];
        if (typeof end === 'undefined') {
          end = start;
          start = 0;
        }
        for (let i = start; i < end; i += step) {
          output.push(i);
        }
        return output;
    };

    let array = 5
    if(array/current < current)
    {
        if(current-2 < 1)
        {
            setstart(1)
        }
        setend(start+5)
        range(start, end)
        console.log(current)
    }

    const paginateFunc = (url: any, pageNumber: any) => {
        redirectTo(url)
        setcurrent(pageNumber)
    }

    return (
        <div>
            {
                counts > 1 ? (
                    <div className="flex m-2">
                        {
                            range(start, end).map((num: any, index:any) => {
                                let pageNum = index+1
                                return (<a key={index} className={`border border-gray-300 border-solid mr-2 px-3 py-2 rounded cursor-pointer ${current==pageNum ? 'bg-blue-300': ''}`} onClick={()=>paginateFunc(`/search-result/${props.search}?page=${pageNum}`, pageNum)}>
                                    {index+1}
                                </a>)
                            })
                        }
                    </div>
                ) : ''
            }
        </div>
    )
}

export default Pagination
