window.addEventListener('load', () => {
    plans = JSON.parse(localStorage.getItem('plans')) || [];
    const nameInput = document.querySelector('#name')
    const newPlanForm = document.querySelector('#new-plan-form')

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newPlanForm.addEventListener('submit', e => {
        e.preventDefault();

        const plan = {
            content: e.target.elements.content.value,
            area: e.target.elements.area.value,
            done: false
        }

        plans.push(plan);

        localStorage.setItem('plans', JSON.stringify(plans));

        e.target.reset();

        DisplayPlans();
    })
})

const greeting = document.getElementById("welcome");
const hour = new Date().getHours();
const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
let welcomeText = "";

if (hour < 12) welcomeText = welcomeTypes[0];
else if (hour < 18) welcomeText = welcomeTypes[1];
else welcomeText = welcomeTypes[2];

greeting.innerHTML = welcomeText;

function DisplayPlans () {
    const planList = document.querySelector('#plan-list');

    planList.innerHTML = '';

    plans.forEach(plan => {
        const planItem = document.createElement('div');
        planItem.classList.add('plan-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type='checkbox';
        input.checked = plan.done;
        span.classList.add('bubble');

        if (plan.area == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('plan-content');
        actions.classList.add('actions');
        editButton.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${plan.content}" readonly>`;
        editButton.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        planItem.appendChild(label);
        planItem.appendChild(content);
        planItem.appendChild(actions);

        planItem.appendChild(planItem);

        if (plan.done) {
            planItem.classList.add('done')
        }

        input.addEventListener ('click', e => {
            plan.done = e.target.checked;
            localStorage.setItem('plans', JSON.stringify(plans));

            if (plan.done) {
                planItem.classList.add('done');
            } else {
                planItem.classList.remove('done');
            }

            DisplayPlans();
        })

        editButton.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                plan.content = e.target.value;
                localStorage.setItem('plans', JSON.stringify(plans));
                DisplayPlans();
            })
        })

        deleteButton.addEventListener('click', e => {
            plans = plans.filter(p => p != plan);
            localStorage.setItem('plans', JSON.stringify(plans));
            DisplayPlans();
        })
    })
}