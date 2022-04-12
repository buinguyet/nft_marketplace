import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import Detail from './Detail'

const Home = ({ marketplace, nft, account }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([]);
  const [openDetail, setOpenDetail]= useState(false);
  const [currentItem, setCurrentItem]= useState(null);
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  const onCloseModal= ()=>{
    setOpenDetail(false);
  }

  const onClickModal= (item)=>{
    setOpenDetail(true);
    setCurrentItem(item);
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, []);

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <div style={{height: "200px"}}>
                  <Card.Img style={{height: "100%"}} variant="top" src={item.image} onClick= {()=>onClickModal(item)}/>
                  </div>
                  <Card.Body color="secondary">
                    <Card.Title style={{fontWeight: "bold"}}>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description.length> 20 ? item.description.slice(0, 20) + '...' : item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer style={{alignItems: 'center', justifyContent: 'center'}}>
                  <div className='d-grid'>
                    {JSON.stringify(account.toLowerCase()) !== JSON.stringify(item.seller.toLowerCase()) ?
                      <Button onClick={() => buyMarketItem(item)} size="lg" style={{backgroundColor: "#488FB1", borderColor: "#488FB1"}}>
                        Buy for: {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>: 
                    <Button size="lg" style={{backgroundColor: "#94B49F", borderColor: "#94B49F"}}>
                    NFT price: {ethers.utils.formatEther(item.totalPrice)} ETH
                  </Button>}
                  </div>
                    </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          {openDetail && <Detail openDetail={openDetail} 
                        onCloseModal={onCloseModal} item={currentItem} />}
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}
export default Home