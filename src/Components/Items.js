import React from 'react'
import currencyFormatter from 'currency-formatter'

const Items = ({ items }) => {
  let no = 1;
  return (
    <div>
      <div className="m-4">
        <h2 className="text-center">Data dalam Table</h2>
        <div className="row justify-content-center">
          <div className="col-md-6"> 
            <table className="table">
              <thead className="thead table-dark">
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
               

                  items.length > 0 ? items.map(item => {
                  const {province, province_id, city, city_id, total} = item;
                  
                    return (
                      
                        <tr key={city_id}>
                          <th>{no++}</th>
                          <th scope="row">{city_id}</th>
                          <td>{city}</td>
                          <th scope="row">{province_id}</th>
                          <td>{province}</td>
                          <th>{currencyFormatter.format(total, {code: 'IDR'})}</th>
                        </tr>
  
                    );
                  }) : <div className="alert alert-primary alert-md" role="alert">
                        Loading ...
                      </div>
                }
                </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Items;