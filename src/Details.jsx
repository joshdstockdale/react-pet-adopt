import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import { useState, useContext } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["details", id],
    queryFn: fetchPet,
  });

  if (isPending) {
    return (
      <div className="loading-pane">
        <h2 className="loader">☺️</h2>
      </div>
    );
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }
  const pet = data.pets[0];
  return (
    <div className=" mx-auto my-0 mb-6 w-11/12 rounded-lg bg-gray-100 p-4 shadow">
      <Carousel images={pet.images} />
      <div>
        <h1 className="my-1 text-center text-4xl text-gray-800">{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button
          className="rounded bg-orange-500 px-5 py-2 text-white hover:opacity-50"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        <p className=" px-4 leading-relaxed">{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to Adopt?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
