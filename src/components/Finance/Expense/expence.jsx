// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { Table, Button, Tooltip } from 'antd';
// import AddExpense from './Forms/AddExpence';
// import { fetchCatagories } from '../../../store/catagory/catagoryyAction';
// import { createExpense, fetchExpenses } from '../../../store/finance/financeAction';
// import moment from 'moment';


// function ExpenseTabPart({ expenses, loading, fetchExpenses , categories ,
//   fetchCategories , createExpense }) {
//   useEffect(() => {
//     fetchExpenses();
//     fetchCategories();
//   }, []);


//   const [formVisible, setFormVisible] = useState(false);

//   const columns = [
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       render: (text) => (
//         <div>{moment(text).format('dddd DD YYYY')}</div>
//       ),
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//     },
//     {
//       title: 'Descritption',
//       dataIndex: 'description',
//       key: 'description',
//       render: (text) =>(
//         <Tooltip title={text}>
//         <div className='text-ellipsis overflow-hiddentruncate max-w-3xl text-left text-lightBlack '>{text ? text : '-'}</div>
//       </Tooltip>
//       )
//     },
//     {
//       title: 'Category',
//       dataIndex: 'category',
//       key: 'category',
//       render: (category) =>(
//         <div>{category ? category?.name : '-'}</div>
//       )
//     },  
//   ];

//   const toggleFormVisibility = () => {
//     setFormVisible(!formVisible);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//  <h2 className='text-xl font-bold text-white'>Expense Table</h2>
//       <Button onClick={toggleFormVisibility} type="primary" style={{ marginBottom: '1rem' }}>
//         {formVisible ? 'Hide Expense Form' : 'Add Expense'}
//       </Button>

//       </div>
     
      
//       {formVisible && 
//       <AddExpense 
//         categories={categories}
//         createExpence={createExpense}
//         visible={formVisible}
//         setVisible={setFormVisible}
//        />}
      
//       <Table
//         dataSource={expenses}
//         columns={columns}
//         loading={loading}
//         rowKey={(record) => record.id}
//       />
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     expenses: state.finances.expenses,
//     loading: state.finances.loading,
//     error: state.finances.error,
//     categories: state.catagories.catagories,
//     loading: state.catagories.loading,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchExpenses: () => dispatch(fetchExpenses()),
//     fetchCategories: () => dispatch(fetchCatagories()),
//     createExpense : (data)=> dispatch(createExpense(data))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTabPart);



// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { Table, Button, Tooltip, Input, Select, DatePicker } from 'antd';
// import AddExpense from './Forms/AddExpence';
// import { fetchCatagories } from '../../../store/catagory/catagoryyAction';
// import { createExpense, fetchExpenses } from '../../../store/finance/financeAction';
// import moment from 'moment';

// const { Option } = Select;

// function ExpenseTabPart({ expenses, loading, fetchExpenses, categories, fetchCategories, createExpense }) {
//   useEffect(() => {
//     fetchExpenses();
//     fetchCategories();
//   }, []);

//   const [formVisible, setFormVisible] = useState(false);
//   const [filters, setFilters] = useState({
//     date: null,
//     name: '',
//     amount: null,
//     category: '',
//   });

//   const columns = [
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       render: (text) => moment(text).format('dddd DD YYYY'),
//       filters: expenses.reduce((acc, curr) => {
//         const date = moment(curr.date).format('YYYY-MM-DD');
//         if (!acc.find(item => item.text === date)) {
//           acc.push({ text: date, value: date });
//         }
//         return acc;
//       }, []),
//       filteredValue: filters.date ? [filters.date] : null,
//       onFilter: (value, record) => moment(record.date).isSame(value, 'day'),
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       filteredValue: filters.name ? [filters.name] : null,
//       onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       filteredValue: filters.amount ? [filters.amount] : null,
//       onFilter: (value, record) => record.amount === parseFloat(value),
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       render: (text) => (
//         <Tooltip title={text}>
//           <div className='text-ellipsis overflow-hidden truncate max-w-3xl text-left text-lightBlack'>{text || '-'}</div>
//         </Tooltip>
//       ),
//     },
//     {
//       title: 'Category',
//       dataIndex: 'category',
//       key: 'category',
//       filteredValue: filters.category ? [filters.category] : null,
//       onFilter: (value, record) => record.category.id === value,
//       render: (category) => (
//         <div>{category ? category.name : '-'}</div>
//       ),
//     },
//   ];

//   const handleFilterChange = (key, value) => {
//     setFilters({
//       ...filters,
//       [key]: value || '',
//     });
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       date: null,
//       name: '',
//       amount: null,
//       category: '',
//     });
//   };

//   const toggleFormVisibility = () => {
//     setFormVisible(!formVisible);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className='text-xl font-bold text-white'>Expense Table</h2>
//         <Button onClick={toggleFormVisibility} type="primary" style={{ marginBottom: '1rem' }}>
//           {formVisible ? 'Hide Expense Form' : 'Add Expense'}
//         </Button>
//       </div>

//       {formVisible &&
//         <AddExpense
//           categories={categories}
//           createExpence={createExpense}
//           visible={formVisible}
//           setVisible={setFormVisible}
//         />}

//       <div className="flex flex-wrap gap-4 mb-4">
//         <DatePicker onChange={(date) => handleFilterChange('date', date)} />
//         <Input placeholder="Enter name" onChange={(e) => handleFilterChange('name', e.target.value)} />
//         <Input placeholder="Enter amount" onChange={(e) => handleFilterChange('amount', e.target.value)} />
//         <Select defaultValue="" style={{ width: 120 }} onChange={(value) => handleFilterChange('category', value)}>
//           <Option value="">All Categories</Option>
//           {categories.map(category => (
//             <Option key={category.id} value={category.id}>{category.name}</Option>
//           ))}
//         </Select>
//         <Button onClick={handleClearFilters}>Clear Filters</Button>
//       </div>

//       <Table
//         dataSource={expenses}
//         columns={columns}
//         loading={loading}
//         rowKey={(record) => record.id}
//       />
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     expenses: state.finances.expenses,
//     loading: state.finances.loading,
//     error: state.finances.error,
//     categories: state.catagories.catagories,
//     loading: state.catagories.loading,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchExpenses: () => dispatch(fetchExpenses()),
//     fetchCategories: () => dispatch(fetchCatagories()),
//     createExpense: (data) => dispatch(createExpense(data)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTabPart);



import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Tooltip, Input, Select, DatePicker } from 'antd';
import AddExpense from './Forms/AddExpence';
import { fetchCatagories } from '../../../store/catagory/catagoryyAction';
import { createExpense, fetchExpenses } from '../../../store/finance/financeAction';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

function ExpenseTabPart({ expenses, loading, fetchExpenses, categories, fetchCategories, createExpense }) {
  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const [formVisible, setFormVisible] = useState(false);
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
      filters: expenses.reduce((acc, curr) => {
        const date = moment(curr.date).format('YYYY-MM-DD');
        if (!acc.find(item => item.text === date)) {
          acc.push({ text: date, value: date });
        }
        return acc;
      }, []),
      filteredValue: filters.date ? [filters.date] : null,
      onFilter: (value, record) => moment(record.date).isSame(value, 'day'),
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
  ];

  const handleFilterChange = (key, value) => {
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
        <h2 className='text-xl font-bold text-white'>Expense Table</h2>
        <Button onClick={toggleFormVisibility} type="primary" style={{ marginBottom: '1rem' }}>
          {formVisible ? 'Hide Expense Form' : 'Add Expense'}
        </Button>
      </div>

      {formVisible &&
        <AddExpense
          categories={categories}
          createExpence={createExpense}
          visible={formVisible}
          setVisible={setFormVisible}
        />}

      <div className="flex flex-wrap gap-4 mb-4">
        <RangePicker onChange={handleDateRangeChange} />
        <Input placeholder="Enter name" onChange={(e) => handleFilterChange('name', e.target.value)} />
        <Input placeholder="Enter amount" onChange={(e) => handleFilterChange('amount', e.target.value)} />
        <Select defaultValue="" style={{ width: 120 }} onChange={(value) => handleFilterChange('category', value)}>
          <Option value="">All Categories</Option>
          {categories.map(category => (
            <Option key={category.id} value={category.id}>{category.name}</Option>
          ))}
        </Select>
        <Button onClick={handleClearFilters}>Clear Filters</Button>
      </div>

      <Table
        dataSource={expenses}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    expenses: state.finances.expenses,
    loading: state.finances.loading,
    error: state.finances.error,
    categories: state.catagories.catagories,
    loading: state.catagories.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExpenses: () => dispatch(fetchExpenses()),
    fetchCategories: () => dispatch(fetchCatagories()),
    createExpense: (data) => dispatch(createExpense(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTabPart);
