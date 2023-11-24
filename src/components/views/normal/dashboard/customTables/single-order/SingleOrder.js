import { useState } from "react";
import orderActions from "../../../../../../api/orderActions";

const SingleOrder = ({order}) => {
    const [open, setOpen] = useState(null);
    const createdAt = new Date(order.createdAt);
    const [defaultSelect, setDefaultSelect] = useState(order.status);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = (e) => {
        setLoading(true);
        const updateBody = { status: e.target.value };
        const id = order.id;
        orderActions.updateOrder(id, updateBody).then(res => {
            setTimeout(() => {
                if(res.success && res.order[0] > 0) {
                    setDefaultSelect(updateBody.status);
                }
                setLoading(false);
            }, 1000)
        })
    }

    return (
        <div className="single-order">
            <div className="main">
                <div>
                    <span className="mobile-header">ID</span>
                    <span>#{order.id}</span>
                </div>
                <div>
                    <span className="mobile-header">Email</span>
                    <span>{order.receiverData.email}</span>
                </div>
                <div>
                    <span className="mobile-header">Status</span>
                    <select 
                    name="status" 
                    className={`status ${defaultSelect}`} 
                    onChange={handleStatusChange}
                    value={defaultSelect}
                    disabled={loading}>
                        <option value="Accepted">Do opłacenia</option>
                        <option value="Paid">Opłacone</option>
                        <option value="Sent">Wysłane</option>
                        <option value="Completed">Zakończone</option>
                    </select>
                </div>
                <div>
                    <span className="mobile-header">Kwota</span>
                    <span>{Number(order.total).toFixed(2)} zł</span>
                </div>
                <div>
                    <span className="mobile-header">Dowód zakupu</span>
                    <span>{order.wantInvoice ? 'Faktura' : 'Paragon'}</span>
                </div>
                <div>
                    <span className="mobile-header">Data złożenia</span>
                    <span>{createdAt.toLocaleDateString()}</span>
                </div>
                <div>
                    <div className={open ? 'caret-wrapper rotated' : 'caret-wrapper'} onClick={() => setOpen((prev) => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={open ? `additional open` : 'additional'}>
                <div className="additional-content">
                    <h6>Produkty</h6>
                    {order.products.map((product) => {
                        return <div key={product.id}>
                            <span>ID: {product.id}</span>
                            <span>Nazwa: {product.name}</span>
                            <span>Cena Brutto: {product.priceBrutto} zł</span>
                            <span>Ilość: {product.quantity}</span>
                        </div>
                    })}
                </div>
                {order.shippingAddress && <div className="additional-content">
                    <h6>Adres dostawy</h6>
                    <div>
                        <span>Kraj: {order.shippingAddress.country}</span>
                        <span>Miasto: {order.shippingAddress.city}</span>
                        <span>Ulica: {order.shippingAddress.street}</span>
                        <span>Numer budynku: {order.shippingAddress.homeNumber}</span>
                        <span>Kod pocztowy: {order.shippingAddress.postalCode}</span>    
                    </div>
                </div>}
                <div className="additional-content">
                    <h6>Dane odbiorcy</h6>
                    <div>
                        <span>Imię: {order.receiverData.firstName}</span>
                        <span>Nazwisko: {order.receiverData.lastName}</span>
                        <span>Numer telefonu: {order.receiverData.phone}</span>
                    </div>
                </div>
                {order.billingData && <div className="additional-content">
                    <h6>Dane do faktury</h6>
                    <div>
                        <span>NIP: {order.billingData.nip}</span>
                        <span>Nazwa firmy: {order.billingData.companyName}</span>
                        <span>Kraj: {order.billingData.country}</span>
                        <span>Miasto: {order.billingData.city}</span>
                        <span>Ulica: {order.billingData.street}</span>
                        <span>Numer budynku: {order.billingData.buildingNumber}</span>
                        <span>Kod pocztowy: {order.billingData.postalCode}</span>  
                    </div>  
                </div>}
                <div className="additional-content">
                    <h6>Inne</h6>
                    <div>
                        <span>Dokładna data złożenia: {createdAt.toLocaleString()}</span>
                        <span>Chce fakture: {order.wantInvoice ? 'Tak' : 'Nie'}</span>
                        <span>Sposób dostawy: {order.deliveryType}</span>
                        <span>Cena całkowita: {Number(order.total).toFixed(2)} zł</span>
                        {order.comment &&<span>Komentarz do zamówienia: {order.comment}</span>}
                        <span>Grupa i procent zniżki: {order.discount.id}, {order.discount.percentage} %</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder;