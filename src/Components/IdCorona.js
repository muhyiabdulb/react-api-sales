import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import HighMaps from "highcharts/highmaps";
import idAll from "./Components/idAll";

class CustomHighMapCorona extends Component {
  constructor(props) {
    super(props);

    this.getListData = this.getListData.bind(this);

    this.state = {
      list_data: []
    };
  }

  async getListData() {
    await fetch("https://data.covid19.go.id/public/api/prov.json")
      .then((res) => res.json())
      
      .then((response) => {
        this.setState({ list_data: response.list_data });
      });
     
  }

  async componentDidMount() {
    await this.getListData();

    var data = [
      ["id-3700", 0],
      // Aceh
      ["id-ac", this.state.list_data[14].jumlah_kasus],
      // Jawa tengah
      ["id-jt", this.state.list_data[3].jumlah_kasus],
      // Bengkulu
      ["id-be", this.state.list_data[28].jumlah_kasus],
      // Banten
      ["id-bt", this.state.list_data[11].jumlah_kasus],
      // Kalimantan Barat
      ["id-kb", this.state.list_data[26].jumlah_kasus],
      // Kepulauan Bangka Belitung
      ["id-bb", this.state.list_data[33].jumlah_kasus],
      // Bali
      ["id-ba", this.state.list_data[10].jumlah_kasus],
      // Jawa Timur
      ["id-ji", this.state.list_data[1].jumlah_kasus],
      // Kalimantan Selatan
      ["id-ks", this.state.list_data[9].jumlah_kasus],
      // Nusa Tenggara Timur
      ["id-nt", this.state.list_data[32].jumlah_kasus],
      // Sulawesi Selatan
      ["id-se", this.state.list_data[4].jumlah_kasus],
      // Kepualaun Riau
      ["id-kr", this.state.list_data[22].jumlah_kasus],
      // Papua Barat
      ["id-ib", this.state.list_data[18].jumlah_kasus],
      // Sumatera Utara
      ["id-su", this.state.list_data[8].jumlah_kasus],
      // Riau
      ["id-ri", this.state.list_data[5].jumlah_kasus],
      // Sulawesi Utara
      ["id-sw", this.state.list_data[25].jumlah_kasus],
      // Kalimantan Utara
      ["id-ku", this.state.list_data[31].jumlah_kasus],
      // Maluku Utara
      ["id-la", this.state.list_data[24].jumlah_kasus],
      // Sumatera Barat
      ["id-sb", this.state.list_data[7].jumlah_kasus],
      // Maluku
      ["id-ma", this.state.list_data[20].jumlah_kasus],
      // Nusa Tenggara Barat
      ["id-nb", this.state.list_data[19].jumlah_kasus],
      // Sulawesi Tenggara
      ["id-sg", this.state.list_data[16].jumlah_kasus],
      // Sulawesi Tengah
      ["id-st", this.state.list_data[30].jumlah_kasus],
      // Papua
      ["id-pa", this.state.list_data[12].jumlah_kasus],
      // Jawa Barat
      ["id-jr", this.state.list_data[2].jumlah_kasus],
      // Kalimantan Timur
      ["id-ki", this.state.list_data[6].jumlah_kasus],
      // Lampung
      ["id-1024", this.state.list_data[25].jumlah_kasus],
      // Jakarta
      ["id-jk", this.state.list_data[0].jumlah_kasus],
      // Gorontalo
      ["id-go", this.state.list_data[23].jumlah_kasus],
      // Yogyakarta
      ["id-yo", this.state.list_data[21].jumlah_kasus],
      // Sumatera Selatan
      ["id-sl", this.state.list_data[13].jumlah_kasus],
      // Sulawesi Barat
      ["id-sr", this.state.list_data[29].jumlah_kasus],
      // Jambi
      ["id-ja", this.state.list_data[27].jumlah_kasus],
      // Kalimantan Tengah
      ["id-kt", this.state.list_data[17].jumlah_kasus],
      ["undefined", 0]
    ];

    const options = {
      title: {
        text: "COVID-19 DATA"
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: "#EEDD66"
            }
          }
        }
      },
      colorAxis: {
        min: 0,
        minColor: "#E6E7E8",
        maxColor: "#005645"
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },

      subtitle: {
        text: "Indonesia",
        floating: true,
        align: "right",
        y: 50,
        style: {
          fontSize: "16px"
        }
      },
      series: [
        {
          mapData: idAll,
          data: data,
          name: "Indonesia",
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          }
        }
      ],
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      }
    };

    this.chart = new HighMaps["Map"](findDOMNode(this), options);
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div className="in" />;
  }
}

export default CustomHighMapCorona;
