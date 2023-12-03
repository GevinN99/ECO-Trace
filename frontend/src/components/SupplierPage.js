import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SupplierPage() {

    const userId = localStorage.getItem('userId');

    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await axios.get(`http://localhost:8070/MRF/getUserSuppliers/${userId}`);
            setSuppliers(response.data.data);
        };

        fetchSuppliers();
    }, [userId]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">My Suppliers</h1>
            {suppliers.map(supplier => (
                <div key={supplier.supplierId} className="card mb-3">
                    <div className="card-body">
                        <h2 className="card-title">{supplier.supplierName}</h2>
                        <p className="card-text"><strong>ID:</strong> {supplier.supplierId}</p>
                        <p className="card-text"><strong>Address:</strong> {supplier.supplierAddress}</p>
                        <p className="card-text"><strong>Contact:</strong> {supplier.supplierContact}</p>
                        <p className="card-text"><strong>Email:</strong> {supplier.supplierEmail}</p>
                        <p className="card-text"><strong>Type:</strong> {supplier.supplierType}</p>
                    </div>
                </div>
            ))}
        </div>

    );
}


//For Admin Dashboard
// import React, { useState, useEffect } from "react";
// import axios from "axios";
//
// export default function SupplierPage() {
//     const [suppliers, setSuppliers] = useState([]);
//
//     useEffect(() => {
//         const fetchSuppliers = async () => {
//             const response = await axios.get('http://localhost:8070/MRF/getAllSuppliers');
//             setSuppliers(response.data.data);
//         };
//
//         fetchSuppliers();
//     }, []);
//
//     return (
//         <div>
//             <h1>Suppliers</h1>
//             {suppliers.map(supplier => (
//                 <div key={supplier.supplierId} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
//                     <h2>{supplier.supplierName}</h2>
//                     <p>ID: {supplier.supplierId}</p>
//                     <p>Address: {supplier.supplierAddress}</p>
//                     <p>Contact: {supplier.supplierContact}</p>
//                     <p>Email: {supplier.supplierEmail}</p>
//                     <p>Type: {supplier.supplierType}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }