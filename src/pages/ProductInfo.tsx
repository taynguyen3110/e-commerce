import React, { useEffect, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Colors, getProductById, getProductColor, getProductsCount, getProductsRange, imgSrc, Product } from '../services/productServices'
import { Rating } from '../components/Rating'
import filerIcon from '../assets/icons/filter.png'
import classNames from 'classnames'
import { getRandomReview, Review } from '../services/reviewService'
import { ReviewCard } from '../components/ReviewCard'
import { Suggestion } from '../components/Suggestion'
import useMediaQuery from '../shared/hooks/useMediaQuery'
import { formatTitle } from '../utils/formatTitle'
import { QuantityButton } from '../components/QuantityButton'
import { AccordionItem } from '../components/AccordionItem'
import useDocumentTitle from '../shared/hooks/useDocumentTitle'
import { useShoppingCart } from '../shared/context/ShoppingCartContext'
import { notify } from '../utils/notify'
import { useUserAuth } from '../shared/context/UserAuthContext'
import { syncCartToDB } from '../services/userServices'
import { motion } from 'framer-motion'
import ContentLoader from 'react-content-loader'
import { ratio } from '../components/ItemCard'

const ProductInfo = () => {
  const [product, setProduct] = useState<Product | null>()
  const [productColors, setProductColors] = useState<Colors>({})
  const [currentImg, setCurrentImg] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<string>('review')
  const [reviews, setReviews] = useState<Review[]>([])
  const [faq, setFaq] = useState<number>(1)
  const [colorInput, setColorInput] = useState<string>(() =>
    product ? Object.keys(getProductColor(product))[0] : ''
  )
  const [sizeInput, setSizeInput] = useState<string>('S')
  const [quantity, setQuantity] = useState<number>(1)

  const params = useParams()
  const { cartItems } = useShoppingCart()
  const { user, displayLogin } = useUserAuth()
  const id = Number(params.id)
  const navigate = useNavigate()
  const lgScreen = useMediaQuery('(min-width: 1028px)')
  const reviewCount = lgScreen ? 6 : 3

  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart, logCart } = useShoppingCart()

  useEffect(() => {
    fetchProduct(id)
  }, [id])

  useEffect(() => {
    if (user) {
      const saveCart = setTimeout(() => {
        syncCartToDB(user, cartItems);
      }, 1000);
      return () => clearTimeout(saveCart);
    }
  }, [cartItems])

  useEffect(() => {
    if (product) {
      setReviews(getRandomReview(reviewCount))
      fetchProductColors(product)
    }
  }, [product, reviewCount])

  useEffect(() => {
    if (product) {
      setCurrentImg(product.imgSource[colorInput][0])
    }
    setSizeInput(prevS => {
      if (stockOutBySize(prevS)) {
        let sizes = ['S', 'M', 'L'];
        for (let i = 0; i < sizes.length; i++) {
          if (!stockOutBySize(sizes[i])) {
            return sizes[i]
          }
        } return ''
      } else return prevS
    })
  }, [colorInput])

  useEffect(() => {
    setQuantity(1)
  }, [colorInput, sizeInput])

  useDocumentTitle(`${product?.name}`);

  const fetchProduct = async (id: number) => {
    try {
      const productData = await getProductById(id)
      setProduct(productData)
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  const fetchProductColors = async (product: Product) => {
    try {
      const colorsData = await getProductColor(product)
      setProductColors(colorsData)
      setColorInput(Object.keys(colorsData)[0])
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  function getQuantity(color: string, size: string): number {
    if (product) {
      let corArr = product.sizesColors.find(sc => sc.size === size)?.colors;
      return corArr?.find(c => c.color === color)?.stock || 0;
    } else return 0
  }

  function getStockByColor(color: string) {
    if (product) {
      return product.sizesColors?.reduce((stock, sc) => {
        const colorData = sc.colors.find(c => c.color === color);
        return colorData ? colorData.stock + stock : stock;
      }, 0);
    }
  }

  function getStockBySize(size: string) {
    if (product) {
      let corArr = product.sizesColors?.find(sc => sc.size === size)?.colors;
      return corArr?.reduce((stock, c) => c.stock + stock, 0);
    }
  }

  function stockOutByColor(color: string): boolean {
    return getStockByColor(color) === 0
  }

  function stockOutBySize(size: string): boolean {
    return getStockBySize(size) === 0 || getQuantity(colorInput, size) === 0
  }

  function increaseQuantity() {
    if (getQuantity(colorInput, sizeInput) != undefined) {
      setQuantity(prevQuantity => {
        if (prevQuantity < getQuantity(colorInput, sizeInput)) {
          return ++prevQuantity
        } else return prevQuantity
      })
    }
  }

  function decreaseQuantity() {
    setQuantity(prevQuantity => prevQuantity > 0 ? --prevQuantity : 0)
  }

  function handleAddToCart(): void {
    if (id) {
      increaseCartQuantity(id, sizeInput, colorInput, quantity)
      notify('success', 'Item added to Cart.')
    }
  }

  return (
    <div>
      <div className='container px-4 md:px-0'>
        <hr />
        <Breadcrumb product={true} />
        {product &&
          <div className='lg:flex lg:gap-8 lg:h-auto mb-10 lg:mb-14'>
            <div className='flex flex-col lg:flex-row lg:w-1/2 gap-3 mb-5 lg:mb-0'>
              <div className='lg:hidden'>
                {product && <img className='rounded-3xl md:w-full' src={currentImg} alt="" />}
              </div>
              <div className='flex gap-3 lg:w-[calc(24.6%-6px)] lg:flex-col'>
                {
                  colorInput ? product.imgSource[colorInput].map((src) => {
                    return (
                      <div className={classNames('w-[calc(33.33%-8px)] lg:w-full lg:rounded-2xl flex items-center justify-center cursor-pointer rounded-3xl border', { 'border-black': currentImg === src })}>
                        <img className='rounded-3xl lg:rounded-2xl' onClick={() => setCurrentImg(src)} onMouseEnter={() => setCurrentImg(src)} src={src} alt="" />
                      </div>
                    )
                  }) : null
                }
              </div>
              <div className='lg:block lg:w-[calc(75.4%-6px)] hidden'>
                {product.imgSource && <img className='rounded-3xl lg:rounded-2xl md:w-full' src={currentImg} alt="" />}
              </div>
            </div>
            <div className='lg:w-1/2 lg:flex lg:flex-col lg:justify-between lg:'>
              <div className='flex flex-col gap-2 lg:gap-0'>
                <h3 className='text-2xl font-bold'>{product.name}</h3>
                <div className='flex items-center'>
                  <Rating rating={product.rating} />
                  <span className='lg:text-sm text-sm'>{product.rating}<span className='opacity-60'>/5</span></span>
                </div>
                <div>
                  <div className='flex items-center gap-[10px] lg:text-2xl text-2xl font-bold'>
                    <div>${Math.round(product.price * (1 - product.sale / 100))}</div>
                    {product.sale !== 0 ?
                      <>
                        <div className='opacity-40 text-2xl line-through'>{product.price}</div>
                        <div className='lg:text-xs text-sm flex items-center font-normal md:px-[14px] md:py-[6px] px-2 py-3 h-5 text-[#FF3333] bg-opacity-10 bg-[#FF3333] rounded-full'>-{product.sale}%</div>
                      </>
                      : null
                    }
                  </div>
                </div>
                <div className='mt-2'>
                  <p className='text-sm lg:text-base lg:h-[69px] lg:text-wrap lg:truncate'>{product.description}</p>
                </div>
              </div>
              <hr className='my-5 lg:my-0' />
              <div>
                <p>Select Color</p>
                <div className='flex'>
                  <div className='flex flex-wrap gap-4 mt-2'>
                    {Object.entries(productColors).map(([key, value]) => {
                      return (<button
                        className={classNames('p-5 rounded-full border hover:border-black', { 'opacity-20 hover:border-white': stockOutByColor(key) })}
                        title={formatTitle(key)}
                        style={{ backgroundColor: value, outline: key === colorInput ? '2px solid black' : '2px solid white' }}
                        key={key}
                        onClick={() => { setColorInput(key) }}
                        disabled={stockOutByColor(key)}
                      ></button>)
                    })}
                  </div>
                </div>
              </div>
              <hr className='my-5 lg:my-0' />
              <div>
                <p>Choose Size</p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  <button
                    className={classNames('px-5 py-2 bg-background rounded-full', { 'opacity-30': stockOutBySize('S') })}
                    onClick={() => { setSizeInput('S') }}
                    disabled={stockOutBySize('S')}
                    style={sizeInput === 'S' ? { backgroundColor: 'black', color: 'white' } : {}}
                  >Small</button>
                  <button
                    className={classNames('px-5 py-2 bg-background rounded-full', { 'opacity-30': stockOutBySize('M') })}
                    onClick={() => { setSizeInput('M') }}
                    disabled={stockOutBySize('M')}
                    style={sizeInput === 'M' ? { backgroundColor: 'black', color: 'white' } : {}}
                  >Medium</button>
                  <button
                    className={classNames('px-5 py-2 bg-background rounded-full', { 'opacity-30': stockOutBySize('L') })}
                    onClick={() => { setSizeInput('L') }}
                    disabled={stockOutBySize('L')}
                    style={sizeInput === 'L' ? { backgroundColor: 'black', color: 'white' } : {}}
                  >Large</button>
                </div>
              </div>
              <hr className='my-5 lg:my-0' />
              <div className='flex items-center'>
                <p>Quantity: <span className=''>{getQuantity(colorInput, sizeInput)}</span></p>
              </div>
              <hr className='my-5 lg:my-0' />
              <div className='flex items-center justify-around gap-3'>
                <QuantityButton handleAdd={increaseQuantity} handleDecrease={decreaseQuantity} setQuantity={setQuantity} quantity={quantity} />
                <button className='bg-black w-[calc(70%)] text-white text-sm lg:text-base font-light rounded-full py-[14px] lg:py-3'
                  disabled={quantity === 0}
                  onClick={handleAddToCart}
                  style={{ opacity: quantity === 0 ? "30%" : "100%" }}>Add to Cart</button>
              </div>
            </div>
          </div>
        }

        <div className='lg:h-[910px] md:h-[790px] h-[790px]'>
          <div className='flex justify-around mb-5 border-b-2'>
            <p className={classNames('pb-3 lg:w-1/3 text-center', { 'border-b-black border-b-[1px] opacity-100': selectedTab === 'detail' })} onClick={() => { setSelectedTab('detail') }}>Product Details</p>
            <p className={classNames('pb-3 lg:w-1/3 text-center', { 'border-b-black border-b-[1px] opacity-100': selectedTab === 'review' })} onClick={() => { setSelectedTab('review') }}>Rating & Reviews</p>
            <p className={classNames('pb-3 lg:w-1/3 text-center', { 'border-b-black border-b-[1px] opacity-100': selectedTab === 'faq' })} onClick={() => { setSelectedTab('faq') }}>FAQs</p>
          </div>

          {selectedTab === 'detail' && product ?
            <motion.div style={{ x: -50 }} animate={{ x: 0 }} className='flex flex-col gap-2 lg:gap-3 pt-2 lg:text-lg lg:pt-10'>
              <p><span className='font-bold'>Product Name: </span>{product.name}</p>
              <p className='hidden sm:block'><span className='font-bold'>Description: </span>{product.description}</p>
              <p><span className='font-bold'>Sizes Available: </span>Small (S), Medium (M), Large (L)</p>
              <p><span className='font-bold'>Colors Available: </span>{productColors ?
                Object.entries(productColors).map(([key, value]) => (
                  <span>{formatTitle(key)} </span>
                ))
                : null}</p>
              <p><span className='font-bold'>Price: </span>${product.price}</p>
              <p><span className='font-bold'>Brand: </span>Shop.Co</p>
              <p><span className='font-bold'>Material: </span>100% Organic Cotton</p>
              <p><span className='font-bold'>Care Instructions:</span><br />
                <ol className='list-disc pl-10'>
                  <li>Machine wash cold with like colors</li>
                  <li>Tumble dry low</li>
                  <li>Do not bleach</li>
                  <li>Iron on low heat if needed</li>
                  <li>Avoid dry cleaning to maintain fabric quality</li>
                </ol>
              </p>
              <p><span className='font-bold'>Features:</span><br /></p>
              <ol className='list-disc pl-10'>
                <li>
                  <p><span className='font-bold'>Classic Fit: </span>Designed for a comfortable and relaxed fit, suitable for all body types.</p>
                </li>
                <li>
                  <p><span className='font-bold'>Ribbed Crewneck: </span>The ribbed crewneck adds a touch of classic style and durability, preventing stretching over time.</p>
                </li>
                <li>
                  <p><span className='font-bold'>Double-Stitched Seams: </span>Reinforced with double-stitched seams for enhanced durability, ensuring the t-shirt withstands regular wear and washing.</p>
                </li>
                <li>
                  <p><span className='font-bold'>Eco-Friendly Production: </span>Made from organic cotton grown without synthetic pesticides or fertilizers, supporting sustainable farming practices.</p>
                </li>
                <li>
                  <p><span className='font-bold'>Breathable Fabric:</span>The natural cotton material offers excellent breathability, keeping you cool and comfortable throughout the day.</p>
                </li>
              </ol>
            </motion.div>
            : selectedTab === 'faq' ?
              <motion.div style={{ x: 50 }} animate={{ x: 0 }} className='h-full flex lg:flex-row-reverse lg:items-center lg:gap-3 flex-col justify-evenly'>
                <div className='flex flex-col justify-center h-4/6 lg:h-full lg:w-1/2'>
                  <AccordionItem title='What is your return and exchange policy?' faq={faq} expand={faq === 1} setFaq={setFaq} bullet={1}>
                    <p>We offer a 30-day return and exchange policy. Items must be in their original condition, unworn, and with all tags attached.</p>
                    <p>To initiate a return or exchange, please contact our customer service team with your order number and reason for return.</p>
                  </AccordionItem>
                  <AccordionItem title='How do I determine my size?' faq={faq} expand={faq === 2} setFaq={setFaq} bullet={2}>
                    <p>We provide a detailed size guide on each product page to help you find the perfect fit. You can also refer to our general size chart.</p>
                    <p>If you have any specific questions, our customer service team is happy to assist you.</p>
                  </AccordionItem>
                  <AccordionItem title='What are your shipping options and delivery times?' faq={faq} expand={faq === 3} setFaq={setFaq} bullet={3}>
                    <p>We offer standard and express shipping options. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days. </p>
                    <p>Shipping times may vary based on your location and the current volume of orders.</p>
                  </AccordionItem>
                  <AccordionItem title='How do I track my order?' faq={faq} expand={faq === 4} setFaq={setFaq} bullet={4}>
                    <p>Once your order is shipped, you will receive a confirmation email with a tracking number.</p>
                    <p>You can use this tracking number to monitor the status of your shipment on our website or the carrier's website.</p>
                  </AccordionItem>
                  <AccordionItem title='Can I cancel or modify my order after it has been placed?' faq={faq} expand={faq === 5} setFaq={setFaq} bullet={5}>
                    <p>Orders can be canceled or modified within 24 hours of placement. Please contact our customer service team as soon as possible with your order number and request.</p>
                    <p>After 24 hours, we may not be able to make changes.</p>
                  </AccordionItem>
                </div>
                <div className='flex flex-col items-center lg:items-start lg:w-1/2 lg:gap-8 lg:pl-20'>
                  <h4 className='hidden lg:block text-4xl font-bold'>FAQs</h4>
                  <p className='hidden lg:block'>Let us hear your question!</p>
                  <button className='bg-black text-white rounded-full py-3 px-10'>Contact Us</button>
                </div>
              </motion.div>
              :
              <motion.div style={{ x: -50 }} animate={{ x: 0 }}>
                <div className='flex justify-end gap-3 items-center'>
                  <div className='mr-auto'>
                    <h4 className='inline font-bold text-lg mr-1'>All Reviews</h4><p className='text-sm inline'>(483)</p>
                  </div>
                  <img src={filerIcon} className='h-11' alt="Filter Icon" />
                  <button className='bg-black text-white rounded-full py-3 px-4 text-xs lg:text-sm font-extralight'


                    onClick={async () => {
                      if (id) {
                        const productData = await getProductById(id)
                        console.log(productData);

                      }
                    }}


                  >Write a Review</button>
                </div>
                <div className='flex flex-col gap-3 mt-5 lg:flex-none lg:grid lg:grid-cols-2 lg:gap-4'>
                  {reviews && reviews.map(r =>
                    <ReviewCard review={r} />
                  )}
                </div>
                <div className='flex justify-center mt-5 lg:mt-7 lg:text-base text-sm'>
                  <button className='border py-3 px-10 rounded-full' onClick={() => { setReviews(getRandomReview(reviewCount)) }}>Load More Reviews</button>
                </div>
              </motion.div>
          }

        </div>
        <div className=''>
          <Suggestion title='You Might Also Like' viewButton={false} />
        </div>
      </div>


    </div>
  )
}

export default ProductInfo