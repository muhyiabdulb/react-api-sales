import React, { useEffect, useState } from 'react'
import currencyFormatter from 'currency-formatter'
import { DataGrid, ColDef } from '@material-ui/data-grid'

/** @type ColDef[] */
const columns = [
  { field: 'no', headerName: 'No.', width: 110 },
  { field: 'city_id', headerName: 'No. Kota', width: 140 },
  { field: 'city', headerName: 'Kota', width: 190 },
  { field: 'province_id', headerName: 'No. Provinsi', width: 160 },
  { field: 'province', headerName: 'Provinsi', width: 190 },
  { field: 'qty', headerName: 'Quantity', width: 150 },
  { field: 'total', headerName: 'Total', width: 160 },
]

function Data() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)

  const getSales = async () => {
    setLoading(true)
    try {
      let response = await fetch('https://api.blst.co.id/dashboard/sales-by-region')
      const json = await response.json()
      setSales(json.data)
      setLoading(false)
    } catch (e) {
      setLoading(true)
      console.log(e.message);
    }
  }

  useEffect(() => {
    getSales();
  }, [])

  return (

    <div className="p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            {
              loading ? (<div className="alert alert-primary alert-md" role="alert">
                Loading ...
              </div>) :
              <DataGrid 
              columns={columns} 
              rows={sales.map((sale, index) => ({
                no: index + 1,
                id: sale.city_id,
                city_id: sale.city_id,
                city: sale.city,
                province_id: sale.province_id,
                province: sale.province,
                qty: sale.qty,
                total: currencyFormatter.format(sale.total, { code: 'IDR' })
              }))} pageSize={10} autoHeight />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Data;