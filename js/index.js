const tbody = document.getElementById("tbody")
const form = document.getElementById("form")
const name = document.getElementById("name")
const price = document.getElementById("price")
const status = document.getElementById("status")
const description = document.getElementById("description")
const btn = document.getElementById("btn");

function validate(name, price, status, description) {
    
    return true;
}

btn && btn.addEventListener('click', function(e) {
    e.preventDefault()
    const isValid = validate(name, price, status, description)
    if(isValid) {
        btn.setAttribute('disablet', true)
        btn.innerHTML = 'yuborilmoqda...'
        const phone = {
            name: name.value,
            status: status.value,
            price: price.value,
            description: description.value,
            category_id: 2
        } 
        fetch('https://auth-rg69.onrender.com/api/products', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(phone)
        })
            .then(res => res.json())
            .then(data => {
                btn.removeAttribute('disabled')
                btn.innerHTML = 'Saqlash'
                if(data.id) {
                    let row = createRow(data, tbody.childElementCount + 1)
                    tbody.innerHTML += row;
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})

function createRow(phone, index) {
  return `
                 <tr>
                    <td>${index}.</td>
                    <td>${phone.name}</td>
                    <td>${phone.price}$</td>
                    <td>${phone.status}</td>
                    <td>${phone.description}</td>
                    <td>${phone.createdAt}</td>
                    <td>${phone.updatedAt}</td>
                    <td data-is = ${phone.id}>
                        <i class="fa-regular fa-trash-can btn"></i>
                    </td>
                </tr>`
}

const API = 'https://auth-rg69.onrender.com/api/products'

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${API}/all`, {
    method: "GET"
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      if(data.length) {
        data.forEach((phone, index) => {
            let row = createRow(phone, index + 1)
            tbody.innerHTML += row
        });
        const deleteButtons = document.querySelectorAll('i.fa-trash-can')
        
        if(deleteButtons.length) {
            deleteButtons.forEach(del => {
                del.addEventListener('click', function() {
                    let isDelete = confirm(`Rostanham ushbu malumotni o'chirmoqchimisiz`)
                    if(isDelete) {
                        let id = this.parentNode.getAttribute('data-is')
                        if(id) {
                            fetch(`${API}/${id}`, {
                                method: 'DELETE'
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
                                    window.location.reload()
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                    }
                })
            })
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
