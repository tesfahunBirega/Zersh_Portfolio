
import React, { useState } from 'react';
import { Table, InputNumber } from 'antd';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { createFinance, deleteFinance, fetchFinances, updateFinance } from '../../store/finance/financeAction';
import { fetchCatagories } from '../../store/catagory/catagoryyAction';

const MonthSelector = () => {
  const [amounts, setAmounts] = useState(Array(12).fill(0));
  const currentMonth = moment().month();
  const months = moment.months();

  const handleAmountChange = (value, index) => {
    const newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  const plannedAmounts = [10000, 15000, 20000, 22000, 25000, 30000, 30000, 30000, 40000, 40000, 40000, 40000];

  const differences = amounts.map((amount, index) => amount - plannedAmounts[index]);

  const generateMonthColumns = () => {
    return months.map((month, index) => ({
      title: month,
      dataIndex: month,
      key: month,
      render: (_, recordIndex) => (
        <InputNumber
          defaultValue={0}
          value={amounts[index]}
          onChange={(value) => handleAmountChange(value, index)}
          min={0}
          disabled={index !== currentMonth}
          style={{ width: '100%' }}
        />
      ),
    }));
  };

  const columns = generateMonthColumns();
  const dataSource = [{ key: 1 }];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Difference',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(131,138,133,0.4)',
        borderColor: 'rgba(131,138,133,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(131,138,133,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(131,138,133,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: differences,
      },
      {
        label: 'Planned',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(47,153,76,0.4)',
        borderColor: 'rgba(47,153,76,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(47,153,76,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(47,153,76,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: plannedAmounts,
      },
      {
        label: 'Current',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(255,0,0,0.4)',
        borderColor: 'rgba(255,0,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: amounts, 
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'My Plan and my current status!',
      fontSize: 20,
      fontColor: 'white',
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'white', 
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: 'white',
            callback: function (value, index, values) {
              return value;
            },
          },
        },
      ],
    },
    layout: {
      padding: {
        bottom: 20, 
      },
    },
  };

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} bordered />
      <div style={{ height: '200px' }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    finances: state.finance,
    catagories: state.finance,
    finance: state.finance,
    loading: state.finance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFinances: () => dispatch(fetchFinances()),
    createFinance: (financeData) => dispatch(createFinance(financeData)),
    updateFinance: (data) => dispatch(updateFinance(data)),
    deleteFinance: (financeId) => dispatch(deleteFinance(financeId)),
    fetchCatagory: () => dispatch(fetchCatagories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelector);