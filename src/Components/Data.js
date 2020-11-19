import React, { useEffect, useState } from 'react'
import currencyFormatter from 'currency-formatter'
import { DataGrid } from '@material-ui/data-grid'

const columns = [
  { field: 'no', headerName: 'No.' },
  { field: 'city_id', headerName: 'No. Kota' },
  { field: 'city', headerName: 'Kota' },
  { field: 'province_id', headerName: 'No. Provinsi' },
  { field: 'province', headerName: 'Provinsi' },
  { field: 'qty', headerName: 'Quantity' },
  { field: 'total', headerName: 'Total' },
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
          <div className="col-md-10">
            {
              loading ? (<div className="alert alert-primary alert-md" role="alert">
                Loading ...
              </div>) :
              <DataGrid 
              columns={columns} 
              rows={sales.map((sale, index) => ({
                no: index + 1,
                id: sale.city_id,
                ...sale,
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