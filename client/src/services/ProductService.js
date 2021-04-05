

export function CreateProduct(user, inputs, condition, shipping){
    
    const body = {
        UserEmail: user.email,
        Category: inputs.children[8].children[1].value,
        Description: inputs.children[6].children[1].value,
        Name: inputs.children[0].children[1].value,
        IsFreeShipping: shipping === 'Free Shipping' ? true : false,
        Image: inputs.children[2].children[1].value,
        Price: inputs.children[12].children[1].value,
        Condition: condition,
        KeyWords: inputs.children[4].children[1].value.split(' '),
    };
    fetch('http://localhost:5002/api/product/add',{
        method: 'POST',
        body: JSON.stringify(body),
        headers : {
            'Content-Type': 'application/json',
        },
    });
}