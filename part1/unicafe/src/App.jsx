import { useState } from 'react';

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

const Statistics = ({ value }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={value.good} />
        <StatisticLine text="neutral" value={value.neutral} />
        <StatisticLine text="bad" value={value.bad} />
        <StatisticLine text="all" value={value.all} />
        <StatisticLine text="average" value={value.average} />
        <StatisticLine text="positive" value={value.positive} />
      </tbody>
    </table>
  );
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  const values = {
    good,
    neutral,
    bad,
    all,
    average,
    positive
  }
  
  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />  
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>

      {all === 0 && 
        <p>No feedback given</p>
      }
      {all > 0 &&
        <Statistics value={values} />
      }
    </div>
  )
}

export default App;