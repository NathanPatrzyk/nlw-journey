import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalInputOpen, setIsGuestsModalInputOpen] = useState(false);
  const [isConfirmTripModalInputOpen, setIsConfirmTripModalInputOpen] =
    useState(false);

  const [destination, setDestination] = useState("");
  const [owerName, setOwerName] = useState("");
  const [owerEmail, setOwerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const [emailsToInvite, setEmailsToInvite] = useState([
    "diego@rocketseat.com.br",
    "john@acme.com",
  ]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function clearGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModalInput() {
    setIsGuestsModalInputOpen(true);
  }

  function clearGuestsModalInput() {
    setIsGuestsModalInputOpen(false);
  }

  function openConfirmTripModalInput() {
    setIsConfirmTripModalInputOpen(true);
  }

  function clearConfirmTripModalInput() {
    setIsConfirmTripModalInputOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate("/trips/123");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            clearGuestsInput={clearGuestsInput}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModalInput={openConfirmTripModalInput}
              openGuestsModalInput={openGuestsModalInput}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalInputOpen && (
        <InviteGuestsModal
          clearGuestsModalInput={clearGuestsModalInput}
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalInputOpen && (
        <ConfirmTripModal
          clearConfirmTripModalInput={clearConfirmTripModalInput}
          createTrip={createTrip}
          setOwerName={setOwerName}
          setOwerEmail={setOwerEmail}
        />
      )}
    </div>
  );
}
