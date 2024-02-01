import React, { useState } from 'react'
import '../Asset/css/style.css'
import img1 from '../Asset/image/img-1.webp';
import img2 from '../Asset/image/img-2.webp';
import img3 from '../Asset/image/img-3.webp';
import img4 from '../Asset/image/img-4.webp';

export default function Product() {
    const [products, setProduct] = useState([
        { name: 'Lamboo Creation ', dsc: 'HabibaArtGallery U rack wall Shelf (Number of Shelves - 3, Black)', price: 342, img: img1 },
        { name: 'SMARTEES', dsc: 'AG Shopee Wall shelf Intersecting Wall  (Number of Shelves - 4, Brown)', price: 125, img: img2 },
        { name: 'BLIVE', dsc: 'Annu Handicrafts Wooden Wall Shelf  (Number of Shelves - 1, Brown)', price: 255, img: img3 },
        { name: 'NB NICKY BOY ', dsc: 'AN Craft Wall Temple  (Medium Density Fiber) Wall Shelf  ', price: 298, img: img4 }
    ])
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex flex-wrap">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className="w-3">
                                <div className="product-card">
                                    <div className="d-flex justify-center product-img">
                                        <img src={product.img} alt={product.name} className='img-fluid' />
                                    </div>
                                    <h2 className='title'>{product.name}</h2>
                                    <p className='dsc'>{product.dsc}</p>
                                    <p className='price'>Price : {product.price}</p>
                                    <button className='btn btn-warning me-2'>Buy Now</button>
                                    <button className='btn btn-success '>Add To Cart</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        'Products Not Found!'
                    )}
                </div>
            </div>
        </>
    )
}
