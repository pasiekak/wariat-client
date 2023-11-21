const sort = (by, orders, sortingDirection = 'asc') => {
    switch(by) {
        case 'id' :  return sortById([...orders], sortingDirection);
        case 'email': return sortByEmail([...orders], sortingDirection);
        case 'status': return sortByStatus([...orders], sortingDirection);
        case 'total': return sortByTotal([...orders], sortingDirection);
        case 'createdAt': return sortByCreatedAt([...orders], sortingDirection);
        default : return [...orders];
        
    }
}
const sortByCreatedAt = (orders, desc) => {
    const newOrders = orders.sort((a,b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        const comparision = aDate - bDate;

        return desc ? -comparision : comparision
    });
    return newOrders;
}
const sortByTotal = (orders, sortingDirection) => {
    const newOrders = orders.sort((a, b) => {
        const comparison = a.priceAfterDiscounts - b.priceAfterDiscounts;

        return sortingDirection === 'desc' ? -comparison : comparison;
    });
    return newOrders;
}
const sortByStatus = (orders, sortingDirection) => {
    const statusMap = {
        'Completed': 'Zakończone',
        'Sent': 'Wysłane',
        'Paid': 'Opłacone',
        'Accepted': 'Do zapłaty'
    };

    const newOrders = orders.sort((a, b) => {
        const comparison = statusMap[a.status].localeCompare(statusMap[b.status]);

        return sortingDirection === 'desc' ? -comparison : comparison;
    });
    return newOrders;
}
const sortByEmail = (orders, sortingDirection) => {
    const newOrders = orders.sort((a, b) => {
        const comparison = a.receiverData.email.localeCompare(b.receiverData.email);

        return sortingDirection === 'desc' ? -comparison : comparison;
    });
    return newOrders;
}
const sortById = (orders, sortingDirection) => {
    const newOrders = orders.sort((a, b) => {
        const comparison = a.id - b.id;

        return sortingDirection === 'desc' ? -comparison : comparison;
    });
    return newOrders;
}

export default sort;