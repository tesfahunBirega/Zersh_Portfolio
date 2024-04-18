import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Tooltip, Input, Select, DatePicker, Popconfirm } from 'antd';
import { fetchCatagories } from '../../../store/catagory/catagoryyAction';
import { createPayment, deletePayment, fetchPayment, fetchPayments, updatePayment } from '../../../store/finance/financeAction';
import moment from 'moment';
import { FilterOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdatePayment from './Forms/UpdatePayment';
import AddPayment from './Forms/AddPayment';
const { Option } = Select;
const { RangePicker } = DatePicker;

function PaymentTabPart({ payments, loading, fetchPayment, categories, fetchCategories, createPayment , 
  updatePayment,
  deletePayment
}) {
  const [showFilter , setShowFilter] = useState(false)
  
  useEffect(() => {
    fetchPayment();
    fetchCategories();
  }, []);

  const [formVisible, setFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [selectedPayment , setSelectedPayment] = useState(null);
  
  const [filters, setFilters] = useState({
    dateRange: null,
    name: '',
    amount: null,
    category: '',
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('dddd DD YYYY'),
      filters: payments?.reduce((acc, curr) => {
        const date = moment(curr?.date).format('YYYY-MM-DD');
        if (!acc.find(item => item?.text === date)) {
          acc.push({ text: date, value: date });
        }
        return acc;
      }, []),
      filteredValue: filters?.date ? [filters?.date] : null,
      onFilter: (value, record) => moment(record?.date)?.isBetween(value, 'day'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filters.name ? [filters.name] : null,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (value) => (
        <div className="">{value?.toLocaleString()}</div>
      ),
      filteredValue: filters.amount ? [filters.amount] : null,
      onFilter: (value, record) => record.amount === parseFloat(value),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Tooltip title={text}>
          <div className='text-ellipsis overflow-hidden truncate max-w-3xl text-left text-lightBlack'>{text || '-'}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filteredValue: filters.category ? [filters.category] : null,
      onFilter: (value, record) => record.category.id === value,
      render: (category) => (
        <div>{category ? category.name : '-'}</div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div className=' flex items-center gap-2'>
          <Button type="default" onClick={() => {
            setSelectedPayment(record);
            setUpdateFormVisible(true)
          }
            }><EditOutlined  className="text-blue-600 hover:blue-red-800" /></Button>
          <Popconfirm
                title="Are you sure you want to delete this project?"
                onConfirm={() => deletePayment(record._id)}
                okText="Yes"
                okButtonProps={{
                  className:"bg-red-500 color-red-800"
                }}
                type="danger"
                cancelText="No"
              >
                <Button className="text-red-600" icon={<DeleteOutlined  className="text-red-600 hover:text-red-800"/>} />
              </Popconfirm>
        </div>
      ),
    },
  ];

  const handleFilterChange = (key, value) => {
    console.log(value ,filters , "value");
    setFilters({
      ...filters,
      [key]: value || '',
    });
  };

  const handleDateRangeChange = (dates) => {
    setFilters({
      ...filters,
      dateRange: dates || null,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: null,
      name: '',
      amount: null,
      category: '',
    });
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-xl font-bold text-white'>Payment Table</h2>
        <Button onClick={toggleFormVisibility} type="primary" style={{ marginBottom: '1rem' }}>
          {formVisible ? 'Hide Payment Form' : 'Add Payment'}
        </Button>
      </div>

      {formVisible &&
        <AddPayment
          categories={categories}
          createPayment={createPayment}
          visible={formVisible}
          setVisible={setFormVisible}
        />}

{updateFormVisible &&
        <UpdatePayment
        payment={selectedPayment}
          categories={categories}
          updatePayment={updatePayment}
          visible={updateFormVisible}
          setVisible={setUpdateFormVisible}
        />}
      <div className="grid justify-end items-center gap-2 mb-4">
      <Button type="primary" icon={<FilterOutlined />} onClick={()=> setShowFilter((prev)=>!prev)}>
      Filter
    </Button>
        {showFilter && 
          <>
          <RangePicker onChange={handleDateRangeChange} />
        <Input placeholder="Enter name" onChange={(e) => handleFilterChange('name', e.target.value)} />
        <Input placeholder="Enter amount" onChange={(e) => handleFilterChange('amount', e.target.value)} />
        <Select defaultValue="" style={{ width: 120 }} onChange={(value) => handleFilterChange('category', value)}>
          {categories?.filter(item=> item?.type =='expense')?.map(category => (
            <Option key={category.id} value={category.id}>{category.name}</Option>
          ))}
        </Select>
        <Button onClick={handleClearFilters}>Clear Filters</Button>
          </>
        }
      </div>

      <Table
        dataSource={payments}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    payments: state.finances.payments,
    loading: state.finances.loading,
    error: state.finances.error,
    categories: state.catagories.catagories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPayment: () => dispatch(fetchPayments()),
    fetchCategories: () => dispatch(fetchCatagories()),
    createPayment: (data) => dispatch(createPayment(data)),
    updatePayment: (data) => dispatch(updatePayment(data)),
    deletePayment:(id)=>dispatch(deletePayment(id))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTabPart);
