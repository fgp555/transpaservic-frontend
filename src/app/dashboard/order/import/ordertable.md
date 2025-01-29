0      operatorContract
1      orderNumber
2      authorizationNumber
3      client
4      patientName
5      idCard
39      userPhone
42      email
6      origin
7      destination
8      itinerary
9      quantity
11      travelDate
12      postalNumber
13      createDate
15      value
16      netValue
14      check
10      remarks


<!-- ========== order ========== -->

00      operatorContract
01      orderNumber
02      authorizationNumber
03      client
04      patientName
05      idCard
39      userPhone
42      email
06      origin
07      destination
08      itinerary
09      quantity
11      travelDate
12      postalNumber
13      createDate
15      value
16      netValue
14      check
10      remarks


A
B
C
D
E
F
AN
AQ
G
H
I
J
L
M
N
P
Q
O
K


<!-- ==========  ========== -->

<th>00 - A | Contrato de operador No. </th>
<th>01 - B | Numero Orden</th>
<th>02 - C | Diagnostico Principal</th>
<th>04 - E | CLIENTE</th>
<th>06 - G | NOMBRE PACIENTE</th>
<th>07 - H | CEDULA</th>
<th>53 - BB | Teléfono</th>
<th>56 - BE | Email</th>
<th>08 - I | Origen</th>
<th>09 - J | Destino</th>
<th>10 - K | Itinerario</th>
<th>11 - L | Cantidad</th>
<th>16 - Q | Fecha de Viaje</th>
<th>17 - R | CORREO No.❓</th>
<th>18 - S | Fecha de Creación</th>
<th>20 - U | Valor</th>
<th>21 - V | Valor Neto</th>
<th>19 - T | Cheque</th>
<th>15 - P | Observaciones</th>


```jsx
  const [filteredDataWithoutDuplicates, setFilteredDataWithoutDuplicates] = useState([
  {
    "id": 1,
    "operatorContract": 1060960,
    "orderNumber": 4832591,
    "authorizationNumber": 0,
    "client": "NEPS",
    "patientName": "RUBY STELLA GUIZA MATEUS",
    "idCard": 28428866,
    "userPhone": 999555111,
    "email": 0,
    "origin": "SUAITA",
    "destination": "SOCORRO",
    "itinerary": "SUAITA-SOCORRO",
    "quantity": 1,
    "travelDate": "2024-03-05",
    "postalNumber": 19536,
    "createDate": "2024-01-12",
    "value": 0,
    "netValue": 0,
    "check": 0,
    "remarks": "Transsander TTRC-144037-38-39-40-45-46-47-48-49-50-51-52 / 03-03-2024"
  },
  {
    "id": 3,
    "operatorContract": 1060962,
    "orderNumber": 4832593,
    "authorizationNumber": 0,
    "client": "NEPS",
    "patientName": "RUBY STELLA GUIZA MATEUS",
    "idCard": 28428868,
    "userPhone": 999555111,
    "email": 0,
    "origin": "SUAITA",
    "destination": "SOCORRO",
    "itinerary": "SUAITA-SOCORRO",
    "quantity": 3,
    "travelDate": "2024-03-07",
    "postalNumber": 19538,
    "createDate": "2024-01-14",
    "value": 0,
    "netValue": 0,
    "check": 2,
    "remarks": "Transsander TTRC-144037-38-39-40-45-46-47-48-49-50-51-52 / 03-03-2026"
  }
]);
