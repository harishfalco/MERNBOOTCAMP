import React ,{useState , useEffect} from 'react'
import Base from '../core/Base'
import { getAllCategories } from './helper/adminapicall'

 const ManageCategories = () => {
     const [categories, setCategories] = useState([])

     useEffect(() => {
        loadAllCategories()
     }, [])

    const loadAllCategories = ()=>{
        getAllCategories()
        .then(data =>{
            if(data && data.error){
                console.log(data.error);
            }
            else{
                setCategories(data)
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <Base title="welcome admin" description="Manage All categories here">
            <div className="text-center text-white">
                {
                    categories.map(
                        (cate,index)=>{
                            return(
                                <div key={index}>
                                    <h1 className="text-white text-center">{cate.name}</h1>
                                </div>
                            )
                        }
                    )
                }

            </div>
        </Base>
    )
}

export default ManageCategories