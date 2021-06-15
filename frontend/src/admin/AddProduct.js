import React ,{useState , useEffect}from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import Base from "../core/Base"
import { getCategories , createProduct } from './helper/adminapicall';

const AddProduct = () => {

    const {user,token} = isAuthenticated()

    const [values, setValues] = useState({
        name:" ",
        description:" ",
        price : " ",
        stock: " ",
        photo:" ",
        categories :[],
        category :" ",
        loading:false,
        error:" ",
        createdProduct:false,
        getRedirect:false,
        formData:" "
    });

    const { name , description , price , stock , photo ,  
            categories ,  category,loading,error,
             createdProduct,getRedirect,formData } = values


    const preload = ()=>{
        getCategories().then(
            (data) => {
                console.log(data);
                if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({...values,categories : data,formData : new FormData()})
                    console.log(categories);
                }
            }
        )
    }
    
    useEffect(()=>{
        preload()
    },[])

   const onSubmit =(event)=>{
       event.preventDefault();
       setValues({...values,error:" ",loading:true})
       console.log(values);
       createProduct(user._id , token, formData)
       .then(
           (data) =>{
            if(data.error){
              console.log(data.error);
              setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name:" ",
                    description:" ",
                    price : " ",
                     stock: " ",
                     photo:" ",
                     loading:false,
                     createdProduct : true
                })
            }
             
           }
              )
       .catch(error => console.log(error))
   }


   const handleChange =(name)=>event=>{
          const value = name ==="photo" ? event.target.files[0] : event.target.value
          formData.set(name,value);
          setValues({...values,[name]:value})

        }

        const successMessage =()=>{
            if(createdProduct){
                return <h4 className="text-success">product created successfully</h4>
            }
        }
   
        const errorMessage = ()=>{
           if(!createdProduct){
               return <h4 className="text-success">failed to create product</h4>
           }
        }
    
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group ">
            <label className="btn btn-block btn-success  mb-3">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
                
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control  mb-3"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control  mb-3"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control  mb-3"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control  mb-3"
              placeholder="Category"
            >
              <option>Select</option>
              {categories &&
                categories.map((cate,index)=>(
                   <option key={index} value={cate._id}>{
                       cate.name}
                    </option>
                )
                )
                }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control mb-3"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success m-3">
            Create Product
          </button>
        </form>
      );

    return (
       <Base
       title="Add a product"
       description = "prodcut creation section"
       className="container bg-info p-4"
       >
           <h1 className="text-white">add product</h1>
           <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
           <div className="row bg-dark text-white rounded">
             <div className="col-md-8 offset-md-2">
                 {
                    createProductForm()
                 }
                 {
                     successMessage()
                 }
                 {
                     errorMessage()
                 }
             </div>
           </div>
       </Base>
    )
}

export default AddProduct
