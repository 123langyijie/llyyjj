const express = require('express');
const app = express();

// 处理时间戳转换
function handleDate(input) {
  let date;
  
  if (!input) {
    // 空参数返回当前时间（测试要求7-8）
    date = new Date();
  } else if (isNaN(input)) {
    // 尝试解析日期字符串（测试要求5）
    date = new Date(input);
  } else {
    // 解析数字时间戳（测试要求4）
    date = new Date(parseInt(input));
  }

  // 无效日期处理（测试要求6）
  if (date.toString() === 'Invalid Date') {
    return { error: "Invalid Date" };
  }

  // 返回有效结果（测试要求2-3）
  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
}

// API路由（测试要求2-8）
app.get('/api/:date?', (req, res) => {
  const result = handleDate(req.params.date);
  res.json(result);
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
