import React from 'react'
import { API } from '../../Backend'

const ImageHelper = ({product} ) => {

   const imageUrl = product && product._id ? `${API}/product/photo/${product._id}` 
                  :
                 `https://www.pexels.com/photo/man-using-photoshop-software-3561340/` 
             

    return (
        <div>
            <div className="rounded border border-success p-2">
                <img
                  src={imageUrl}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
              </div>
        </div>
    )
}

export default ImageHelper

