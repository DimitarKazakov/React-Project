

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

export function UpdateProduct(user, inputs, condition, shipping, id){
    
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
    fetch(`http://localhost:5002/api/product/update/${id}`,{
        method: 'PUT',
        body: JSON.stringify(body),
        headers : {
            'Content-Type': 'application/json',
        },
    });
}

export function UpdateUser(user, inputs, email){

    const body = {
        Image: inputs.image.value,
        Name: inputs.name.value,
        Address: inputs.address.value,
        Town: inputs.town.value,
        Phone: inputs.phone.value,
    };
    fetch(`http://localhost:5002/api/user/update/${email}`,{
        method: 'PUT',
        body: JSON.stringify(body),
        headers : {
            'Content-Type': 'application/json',
        },
    });
}