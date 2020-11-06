import React, { useEffect, useState } from 'react'
import HighMaps from 'highcharts/highmaps'
import idAll from './Components/idAll'
import currencyFormatter from 'currency-formatter'
import Data from './Components/Data'


const kindaMap = [
  ['1', 'id-ba'],
  ['2', 'id-bb'],
  ['3', 'id-bt'],
  ['4', 'id-be'],
  ['5', 'id-yo'],
  ['6', 'id-jk'],
  ['7', 'id-go'],
  ['8', 'id-ja'],
  ['9', 'id-jr'],
  ['10', 'id-jt'],
  ['11', 'id-ji'],
  ['12', 'id-kb'],
  ['13', 'id-ks'],
  ['14', 'id-kt'],
  ['15', 'id-ki'],
  ['16', 'id-ku'],
  ['17', 'id-kr'],
  ['18', 'id-1024'],
  ['19', 'id-ma'],
  ['20', 'id-la'],
  ['21', 'id-ac'],
  ['22', 'id-nb'],
  ['23', 'id-nt'],
  ['24', 'id-pa'],
  ['25', 'id-ib'],
  ['26', 'id-ri'],
  ['27', 'id-sr'],
  ['28', 'id-se'],
  ['29', 'id-st'],
  ['30', 'id-sg'],
  ['31', 'id-sw'],
  ['32', 'id-sb'],
  ['33', 'id-sl'],
  ['34', 'id-su'],
]

export default function App() {
  // console.log('asd')
  const [data, setData] = useState([])
  const [muncul, setMuncul] = useState(true)

  useEffect(() => {
    new HighMaps['Map'](
      document.querySelector('.in'),
      optionFactory(data, function () {
        const [provinceId] = kindaMap.find(
          ([_, key]) => key === this.point['hc-key']
        )
        // console.log(provinceId)
        const provinceData = data.filter(
          value => value.province_id === provinceId
        )

        return `
        <span><center><strong>${provinceData[0]?.province || 'Data Kosong'
          }</strong></center</span><br />
        
        ${provinceData.reduce(
            (acc, value) =>
              acc +
              `<span>${value.city}: ${currencyFormatter.format(value.total, { code: 'IDR' })}</span> <br/>
        `,
            ''
          ) || 'Data Kosong <br/>'
          } 
      
        <span><b>Total: ${currencyFormatter.format(provinceData.reduce((
            (acc, value) => acc + Number.parseInt(value.total)),
            0
          ), { code: 'IDR' })}</b></span>
        `
      }, muncul)
    )

    // currencyFormatter.format(,{ code: 'IDR' })
    // console.log(map)
  }, [data, muncul])



  useEffect(() => {
    getListData()
  }, [])
  
  async function getListData() {
    const response = await fetch(
      'https://api.blst.co.id/dashboard/sales-by-region'
    )
    // console.log('haaaaaaa')
    const json = await response.json()
    // console.log(json)
    setData(json.data)
  }

  return (
    <>
      <div>
        <input type="checkbox" onChange={() => setMuncul(!muncul)}
        /> Sembunyikan Nama Provinsi
        <div className='in' />
      </div>
      <Data />
    </>
  )
}

function optionFactory(seriesData = [], formatter, muncul) {
  const provinsi = new Map([
    ['1', { kode: 'id-ba', jumlah: 0 }],
    ['2', { kode: 'id-bb', jumlah: 0 }],
    ['3', { kode: 'id-bt', jumlah: 0 }],
    ['4', { kode: 'id-be', jumlah: 0 }],
    ['5', { kode: 'id-yo', jumlah: 0 }],
    ['6', { kode: 'id-jk', jumlah: 0 }],
    ['7', { kode: 'id-go', jumlah: 0 }],
    ['8', { kode: 'id-ja', jumlah: 0 }],
    ['9', { kode: 'id-jr', jumlah: 0 }],
    ['10', { kode: 'id-jt', jumlah: 0 }],
    ['11', { kode: 'id-ji', jumlah: 0 }],
    ['12', { kode: 'id-kb', jumlah: 0 }],
    ['13', { kode: 'id-ks', jumlah: 0 }],
    ['14', { kode: 'id-kt', jumlah: 0 }],
    ['15', { kode: 'id-ki', jumlah: 0 }],
    ['16', { kode: 'id-ku', jumlah: 0 }],
    ['17', { kode: 'id-kr', jumlah: 0 }],
    ['18', { kode: 'id-1024', jumlah: 0 }],
    ['19', { kode: 'id-ma', jumlah: 0 }],
    ['20', { kode: 'id-la', jumlah: 0 }],
    ['21', { kode: 'id-ac', jumlah: 0 }],
    ['22', { kode: 'id-nb', jumlah: 0 }],
    ['23', { kode: 'id-nt', jumlah: 0 }],
    ['24', { kode: 'id-pa', jumlah: 0 }],
    ['25', { kode: 'id-ib', jumlah: 0 }],
    ['26', { kode: 'id-ri', jumlah: 0 }],
    ['27', { kode: 'id-sr', jumlah: 0 }],
    ['28', { kode: 'id-se', jumlah: 0 }],
    ['29', { kode: 'id-st', jumlah: 0 }],
    ['30', { kode: 'id-sg', jumlah: 0 }],
    ['31', { kode: 'id-sw', jumlah: 0 }],
    ['32', { kode: 'id-sb', jumlah: 0 }],
    ['33', { kode: 'id-sl', jumlah: 0 }],
    ['34', { kode: 'id-su', jumlah: 0 }],
  ])
  seriesData.forEach(value => {
    const dataProvinsi = provinsi.get(value.province_id)
    provinsi.set(value.province_id, {
      ...dataProvinsi,
      jumlah: parseInt(dataProvinsi.jumlah) + parseInt(value.total),
    })
  })
  // console.log(provinsi)
  const mappedData = Array.from(provinsi).map(([_, { kode, jumlah }]) => [
    kode,
    jumlah,
  ])
  // console.log(mappedData)
  return {
    title: {
      text: 'Data Sales seluruh Indonesia',
    },
    plotOptions: {
      map: {
        states: {
          hover: {
            color: '#EEDD66',
          },
        },
      },
    },
    colorAxis: {
      min: 0,
      minColor: '#E6E7E8',
      maxColor: '#005645',
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    subtitle: {
      text: 'Indonesia',
      floating: true,
      align: 'right',
      y: 50,
      style: {
        fontSize: '16px',
      },
    },
    series: [
      {
        mapData: idAll,
        data: mappedData,
        name: 'Indonesia',
        dataLabels: {
          enabled: true,
          format: muncul ? '{point.name}' : '',
        },
      },
    ],
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    tooltip: {
      formatter: formatter,
    },
  }
}
