[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hackerino)  [![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

# Touchpad Card for Homeassistant for samsung tv
With this card you can control your samsung smart tv like with your normal physical remote.

## Take a look:
![remoteBell-modified](https://user-images.githubusercontent.com/64681499/209690449-d67ce6a3-02cb-477c-9b16-cc3071fe847b.png)


# Features:
  - Functional touchpad;
  - Customizable doubleclick and hold actions(using ui-editor);
  - Haptic feedback;
  - Anything can be changed using the ui-editor;
  - Every icon can be changed trought the ui-editor;
  - Holding on volume or channel buttons will trigger the action repeatedly until stop holding;
  - Double click or hold action can be a script or a automation and can be selected using the editor;
  - The card will change the top icon to the current source image if available;
  - Double click on top part of the card to open more info dialog about the media player entity;
# New features:
  - One card, multiple remotes;
  - Add/Remove/Move entities to the card;
  - Swipe on top part of card(name area) to switch to next entity;
  - The card can now work with the default homeassistant integration, thanks to the remote entity created by homeassistant;
  - Now you can change click action,and because of that you can now integrate tv's that dont work with service calls like ```remote.send_command || media_player.send_key```, by creating scripts and setting them as click action in the card editor;
## note
  1) Create a separate view for the card, and set it to panel mode(1 card) **(VERY RECOMENDED)**
  2) No need to write any yaml,all settings are available in the ui-editor(:sparkles:)

## Editor sample view:
<img src="https://github.com/iablon/HomeAssistant-Touchpad-Card/assets/64681499/5c0423aa-3518-420c-b903-5a2e3cc75d88" width=100%>
<img src="https://github.com/iablon/HomeAssistant-Touchpad-Card/assets/64681499/5c171e92-41cf-4a7b-98bd-eab52811a429" width=100%>
