module Api
  module V1
    class ContactsController < ApplicationController
      def index
        contacts = Contact.order('first_name ASC')
        render json: { status: 'Success', message: 'Contacts loaded correctly', data: contacts }, status: :ok
      end

      def show
        contact = Contact.find(params[:id])
        render json: { status: 'Success', message: 'Contact loaded correctly', data: contact }, status: :ok
      end

      def create
        contact = Contact.new(contact_params)
        if contact.save
          render json: { status: 'Success', message: 'Contact saved in the database', data: contact }, status: :ok
        else
          render json: { status: 'Error', message: 'Contact not saved in the database', data: contact.errors }, status: :unprocessable_entity
        end
      end

      def update
        contact = Contact.find(params[:id])
        if contact.update(contact_params)
          render json: { status: 'Success', message: 'Contact updated in the database', data: contact }, status: :ok
        else
          render json: { status: 'Error', message: 'Contact not updatedin the database', data: contact.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        contact = Contact.find(params[:id])
        contact.destroy
        render json: { status: 'Success', message: 'Contact deleted from database', data: contact }, status: :ok
      end

      private

      def contact_params
        params.require(:contact).permit(:first_name, :last_name, :email, :phone_number)
      end
    end
  end
end
