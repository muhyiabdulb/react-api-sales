import React, { useEffect, useState } from 'react'
import currencyFormatter from 'currency-formatter'

function Data(){
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

  let no = 1;
  return(
    <div className="p-5">
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              {
                loading ? <div className="alert alert-primary alert-md" role="alert">
                Loading ...
              </div> :

                <table className="table table-striped">
                  <thead className="">
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">No. Kota</th>
                      <th scope="col">Kabupaten/Kota</th>
                      <th scope="col">No. Provinsi</th>
                      <th scope="col">Provinsi</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    sales.map((sale, index) => {
                      return(
                        <tr key={index}>
                          <td>{no++}</td>
                          <td>{sale.city_id}</td>
                          <td>{sale.city}</td>
                          <td>{sale.province_id}</td>
                          <td>{sale.province}</td>
                          <td>{currencyFormatter.format(sale.total, {code: 'IDR'})}</td>
                        </tr> 
                      )
                    })
                  }
                  </tbody>
                </table>
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default Data;