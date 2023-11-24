import { useTranslation } from "react-i18next";

import defaultImage from '../../../../../common/logo/wariatLogoBlack.png';

import './product-summary-table.css';

const ProductSummaryTable = ({products, withDiscountPrices}) => {
    const { t } = useTranslation(null, {keyPrefix:'components.order.summary.products-summary-table'});
    return (
        <table id="products-summary-table">
            <thead>
                <tr>
                    <th>{t('title')}</th>
                    <th></th>
                    <th>{t('quantity')}</th>
                    <th>{t('price')}</th>
                    {withDiscountPrices && <th>{t('price-with-discount')}</th>}
                </tr>
            </thead>
            <tbody>
                {products.map(product => {
                    const total = Number(product.priceBrutto * product.quantity).toFixed(2);
                return <tr key={product.id}>
                    <td>
                        <img src={product.imageID ? `/api/images/${product.imageID}` : defaultImage} alt=""/>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{total} zł</td>
                    {withDiscountPrices && 
                    <td>{Number(product.priceAfterDiscount * product.quantity).toFixed(2)} zł</td>}
                </tr>
                })}
            </tbody>
        </table>
    )
}

export default ProductSummaryTable;