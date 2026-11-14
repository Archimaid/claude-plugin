# Archimaid examples

Valid `archimate-beta` diagrams to start from. Each one passes `archimaid validate`.

## Order management

Assignment, realization, serving and read access.

```mermaid
archimate-beta
  direction LR
  accTitle: Application support for order fulfilment

  element businessProcess fulfil "Fulfil order"
  element applicationComponent oms "Order management system"
  element applicationFunction manage "Manage orders"
  element applicationService orders "Order management"
  element dataObject order "Order record"
  description order "Details of a paid order."

  oms @==> manage
  manage ..|> orders
  orders --> fulfil
  manage <.. order
```

## Cross-layer relationships

Architecture layout with nested claims processing.

```mermaid
archimate-beta
  layout architecture
  title: ArchiMate Cross-Layer Relationships
  accTitle: ArchiMate cross-layer relationships
  accDescr: ArchiSurance's claims process and the business, application, and technology elements that support it.

  element businessActor customer "Customer"
  element businessRole insurant "Insurant"
  element businessActor archisurance "ArchiSurance"
  element businessRole insurer "Insurer"
  element businessService claims_registration "Claims\nRegistration"
  element businessService claims_acceptance "Claims\nAcceptance"
  element businessService claims_payment "Claims Payment"
  element businessProcess process_claims "Process Claims" {
    element businessProcess register "Register"
    element businessProcess accept "Accept"
    element businessProcess adjudicate "Adjudicate"
    element businessProcess pay "Pay"
  }
  element businessObject customer_information "Customer\nInformation"

  element applicationService customer_data_management "Customer Data\nManagement"
  element applicationService payment_processing "Payment Processing"
  element applicationComponent crm_system "CRM System"
  element applicationComponent financial_application "Financial\nApplication"
  element dataObject customer_data "Customer Data"

  element technologyService database_management "Database Management"
  element technologyService application_hosting "Application Hosting"
  element artifact customer_database_tables "Customer Database\nTables"
  element artifact database_access_archive "Database Access Java\nArchive"
  element artifact financial_application_archive "Financial\nApplication Web\nArchive"
  element systemSoftware database_management_system "Database\nManagement System"
  element systemSoftware application_server "Application Server"
  element device blade_system "Blade System"

  process_claims *-- register
  process_claims *-- accept
  process_claims *-- adjudicate
  process_claims *-- pay

  register ==> accept
  accept ==> adjudicate
  adjudicate ==> pay

  customer @==> insurant
  archisurance @==> insurer
  insurer @==> process_claims
  register ..|> claims_registration
  accept ..|> claims_acceptance
  pay ..|> claims_payment
  claims_registration --> insurant
  claims_acceptance --> insurant
  claims_payment --> insurant
  register ..> customer_information

  crm_system ..|> customer_data_management
  financial_application ..|> payment_processing
  customer_data ..|> customer_information
  customer_data_management --> register
  payment_processing --> pay
  crm_system ..> customer_data

  blade_system @==> database_management_system
  blade_system @==> application_server
  database_management_system @==> database_access_archive
  application_server @==> financial_application_archive
  database_management_system ..|> database_management
  application_server ..|> application_hosting
  customer_database_tables ..|> customer_data
  database_access_archive ..|> crm_system
  financial_application_archive ..|> financial_application
  database_management --> crm_system
  application_hosting --> crm_system
  application_hosting --> financial_application
  database_management ..> customer_database_tables
```

## Nested components

Composition, attached and standalone notes, and cross-boundary flows.

```mermaid
archimate-beta
  direction LR
  accTitle: Order management components
  accDescr: An order management suite contains two application components. Notes annotate the suite and its handoff.

  element applicationComponent storefront "Storefront"
  element applicationComponent suite "Order management suite" {
    element applicationComponent orders "Order processing"
    element applicationComponent billing "Billing"
  }

  suite *-- orders
  suite *-- billing

  storefront -.=> orders
  orders -.=> billing

  note review "Confirm retry behaviour\nwith the billing team" on suite
  note handoff "Billing receives the order\nafter payment is confirmed."
  billing --- handoff
```
