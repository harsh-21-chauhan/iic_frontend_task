# iic_frontend_task

# Context Detection Functions
isInsideForm(el):
Checks if the button is inside a form by traversing up the DOM tree. Returns true if a form is found.

isNearTrashIcon(el):
Checks if the button is close to a trash icon. It looks at up to two siblings before and after the button, and also checks the parent for any trash icon (identified by class or attribute). Returns true if found.

isAtBottomOfCard(el):
Checks if the button is the last child inside a .card container. Returns true if so.


# Label and Style Selection
Submit: Blue

Delete: Red

Next: Green

# ChameleonButton Component
ref:
A reference to the actual DOM node of the button.

mode state:
Stores the current context ("submit", "delete", "next", or "default").

# Effect Hook (useEffect)
Runs after the component mounts.

Gets the button’s DOM node via ref.current.

Checks the context in order:

If inside a form, sets mode to "submit".

Else if near a trash icon, sets mode to "delete".

Else if at the bottom of a card, sets mode to "next".

Else, sets mode to "default".