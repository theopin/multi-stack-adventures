
const AccountDetails = ({account}) => {
    if (!account)
      return (<div></div>)
    return (
      <div>
        <h4>Account Balance</h4>
        <h1>
          S${account.balance}
        </h1>
        
      </div>
    );
}

export default AccountDetails;