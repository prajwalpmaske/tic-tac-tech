from fastapi import FastAPI, Request, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
from dotenv import load_dotenv
import uvicorn
import random
import string
from datetime import date, datetime

app = FastAPI()

# Added Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

load_dotenv()
supabase_api = os.getenv("SUPABASE_API_KEY")
supabase_url = os.getenv("SUPABASE_URL")

supabase: Client = create_client(supabase_url=supabase_url, supabase_key=supabase_api)

@app.post("/login")
async def user_login(request: Request):
    try:
        data = await request.json()  # Use await here
        email = data["email"]
        password = data["password"]
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        auth_id = response.user.id

        print(auth_id)


        return JSONResponse(content={"message": "Logged in successfully", "success": True, "auth_id": auth_id})
    except Exception as e:
        print(f"\n\nError in login is:\n{e}")
        return JSONResponse(content={"message": "Error while logging in", "success": False}, status_code=500)
    

def generate_varchar_id(length=12):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))


@app.post("/add_users_b")
async def add_users(
    email: str = Form(...),
    password: str = Form(...),
    phone_number: str = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(...),
    date_of_birth: str = Form(...),
    address: str = Form(...),
    city: str = Form(...),
    state: str = Form(...),
    country: str = Form(...),
    zip_code: str = Form(...),
    registration_date: str = Form(...),
    language: str = Form(...),
    balance: float = Form(...),
    salary: float = Form(...),
    occupation: str = Form(...)
):
    try:
        
        data = {
            "email": email,
            "password": password
        }
        response = supabase.auth.sign_in_with_password(data)
        auth_id = response.user.id
        print(f"User_id: {auth_id}\n")
        account_id = generate_varchar_id()
        upi_id = generate_varchar_id()
        print(f"\nAccount: {account_id}\n\nUpi: {upi_id}\n\n")
        date_of_birth = datetime.strptime(date_of_birth, "%d/%m/%Y").strftime("%Y-%m-%d")
        registration_date = datetime.strptime(registration_date, "%d/%m/%Y").strftime("%Y-%m-%d")

        user_b_data = {
            "auth_id": auth_id,
            "phone_number": phone_number,
            "first_name": first_name,
            "last_name": last_name,
            "date_of_birth": date_of_birth,
            "address": address,
            "city": city,
            "state": state,
            "country": country,
            "zip_code": zip_code,
            "registration_date": registration_date,
            "language": language,
            "balance": balance,
            "salary": salary,
            "occupation": occupation,
            "account_id": account_id,
            "upi_id": upi_id,
            "email": email
        }

        response = supabase.table('users_b').insert(user_b_data).execute()
        return JSONResponse(content={"message": "Done", "success": True}, status_code=200)

    except Exception as e:
        print(f"Error is:\n\n{e}\n")
        return JSONResponse(content={"message": "failure"}, status_code=500)


@app.post("/add_account")
async def add_account(
    email: str = Form(...),
    password: str = Form(...),
    account_type: str = Form(...),
    balance: float = Form(...),
    created_at: str = Form(...),
    status: str = Form(...),
    branch_name: str = Form(...),
    ifsc_code: str = Form(...),
    interest_rate: float = Form(...),
    overdraft_limit: float = Form(...)
):
    try:
        try:
            data = {
                "email": email,
                "password": password
            }
            response = supabase.auth.sign_in_with_password(data)
            auth_id = response.user.id
        except Exception as e:
            print(f"\nError:\n\n{e}")
            return JSONResponse(content={"message": "failure while getting auth_id"}, status_code=500)

        # user_response = supabase.from_('users_b').select('*').eq('auth_id', auth_id).execute()
        try:
            user_response = supabase.from_('users_b').select('account_id').eq('auth_id', auth_id).execute()
            account_id = user_response.data[0]['account_id']
            print(f"Account id is: {account_id}")
        except Exception as e:
            print(f"\nError:\n\n{e}")
            return JSONResponse(content={"message": "failure while getting account_id"}, status_code=500)

        created_at = datetime.strptime(created_at, "%d/%m/%Y").strftime("%Y-%m-%d")
        
        account_data = {
            "account_id": account_id,
            "account_type": account_type,
            "balance": balance,
            "created_at": created_at,
            "status": status,
            "branch_name": branch_name,
            "ifsc_code": ifsc_code,
            "interest_rate": interest_rate,
            "overdraft_limit": overdraft_limit
        }

        account_response = supabase.from_('bank_accounts').insert(account_data).execute()

        return JSONResponse(content={"message": "Done", "account_id": account_id, "success": True}, status_code=200)
    
    except Exception as e:
        print(f"\nError:\n\n{e}")
        return JSONResponse(content={"message": "failure"}, status_code=500)
    

@app.post("/add_card")
async def add_card(

):
    try:
        return JSONResponse(content={"message": "Did Work!!", "success": True}, status_code=True)
    except Exception as e:
        print(f"\n\nError in Adding a Card:\n{e}")
        return JSONResponse(content={"message": "Failed to add card", "success": False}, status_code=False)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
